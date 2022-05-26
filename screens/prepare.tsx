import React, { useEffect } from 'react'
import { Platform, Linking, Text, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { getAuthToken, clearAuthToken } from '@@/libs/authentication'
import { alert, LoadingView } from '@@/components'
import messaging from '@react-native-firebase/messaging'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'

export const PrepareScreen = () => {
  console.log('=========prepare')

  const navigation = useNavigation()
  const dispatch = useDispatch()
  const {
    auth: { token },
    //message: { notification },
  } = useSelector(state => state)

  const navigate = (url: string) => {}

  const handleOpenURL = async (event: { url: string }) => {
    navigate(event.url)
  }

  const init = async () => {
    try {
      await checkPermission()
      await notificationListen()

      if (Platform.OS === 'android') {
        Linking.getInitialURL().then(url => {
          navigate(url!)
        })
      } else {
        Linking.addEventListener('url', handleOpenURL)
      }
    } catch (e) {
      console.log('[init] error', e)
    }
    await refreshToken()
  }

  useEffect(() => {
    init()

    return () => {
      Linking.removeEventListener('url', handleOpenURL)
    }
  }, [])

  const checkPermission = async () => {
    const enabled = await messaging().hasPermission()
    if (!enabled) {
      await requestPermission()
    } else {
      await getToken()
    }
  }

  //useEffect(() => {
  //if (!notification) return;
  ////dispatch(messageActions.notificationMessage())
  ////processMessage(notification)
  //}, [notification])

  const processMessage = (message: any) => {
    console.log('==processMessage', message)
    //if (message.data.topic?.match(/(agent|owner|staff|customer)-\d+-message/)) {
    //dispatch(messageActions.remoteUpdate(message, navigation))
    //return
    //}
  }

  const notificationListen = async () => {
    messaging().onMessage(async message => {
      processMessage(message)
    })

    messaging().onNotificationOpenedApp(async message => {
      console.log('==============on open app', message)
      if (!message) {
        return
      }
      (message as any).go = true
      processMessage(message)
    })

    messaging().setBackgroundMessageHandler(async message => {
      processMessage(message)
    })
  }

  const getToken = async () => {
    try {
      let fcmToken = await AsyncStorage.getItem('fcmToken')
      if (!fcmToken) {
        if (Platform.OS === 'ios') {
          await messaging().registerDeviceForRemoteMessages()
        }
        fcmToken = await messaging().getToken()
        await AsyncStorage.setItem('fcmToken', fcmToken)
      }
    } catch (e) {
      console.log('==get [fcmToken] error', e)
    }
  }

  const requestPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission()
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL

      if (enabled) {
        console.log('Authorization status:', authStatus)
      }

      await getToken()
    } catch (error) {
      console.log('permission rejected')
    }
  }

  const refreshToken = async () => {
    try {
      const token = await getAuthToken()

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        }),
      )
    } catch (e: any) {
      await alert({
        title: 'Lỗi đăng nhập',
        content: `${e.message || e}`,
      })
      clearAuthToken()
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        }),
      )
    }
  }

  return <LoadingView />
}
