import AsyncStorage from '@react-native-community/async-storage'
import { Token } from '@@/types'
import { store } from '@@/configStore'
import * as authActions from '@@/actions/auth'
import _ from 'lodash'

let token: Token | undefined | null

export const getAuthToken = async (): Promise<Token | null> => {
  if (token) {
    return token
  }
  if (token === undefined) {
    const tokenString = await AsyncStorage.getItem('authToken')
    if (tokenString) {
      token = JSON.parse(tokenString)
      if (token) {
        store.dispatch(authActions.loginSuccess(token))
        return token
      }
    }
    return (token = null)
  }
  return null
}

export const isLogin = async (): Promise<boolean> => {
  let token = await getAuthToken()
  if (!token) {
    return false
  }
  return true
}

export const saveAuthToken = async (newToken: Token | null) => {
  token = newToken
  if (token) {
    await AsyncStorage.setItem('authToken', JSON.stringify(token))
  } else {
    await AsyncStorage.setItem('authToken', '')
  }
}

export const clearAuthToken = async () => {
  token = undefined
  await AsyncStorage.removeItem('authToken')
}
