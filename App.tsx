import React, { Component, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

//import {
//Colors,
//DebugInstructions,
//Header,
//LearnMoreLinks,
//ReloadInstructions,
//} from 'react-native/Libraries/NewAppScreen';
import codePush from 'react-native-code-push'
import { Provider, useDispatch } from 'react-redux'
import { store } from './configStore'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import messaging from '@react-native-firebase/messaging'
import { navigationRef } from './RootNavigation'
import { confirm } from '@@/components'
import {
  PrepareScreen,
  LoginScreen,
  ArticleListScreen,
  MainScreen,
} from '@@/screens'
import Feather from 'react-native-vector-icons/Feather'

Feather.loadFont()

//const Section: React.FC<{
//title: string;
//}> = ({children, title}) => {
//const isDarkMode = useColorScheme() === 'dark';
//return (
//<View style={styles.sectionContainer}>
//<Text
//style={[
//styles.sectionTitle,
//{
//color: isDarkMode ? Colors.white : Colors.black,
//},
//]}>
//{title}
//</Text>
//<Text
//style={[
//styles.sectionDescription,
//{
//color: isDarkMode ? Colors.light : Colors.dark,
//},
//]}>
//{children}
//</Text>
//</View>
//);
//};

//const App = () => {
//const isDarkMode = useColorScheme() === 'dark';

//const backgroundStyle = {
//backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//};

//return (
//<SafeAreaView style={backgroundStyle}>
//<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//<ScrollView
//contentInsetAdjustmentBehavior="automatic"
//style={backgroundStyle}>
//<Header />
//<View
//style={{
//backgroundColor: isDarkMode ? Colors.black : Colors.white,
//}}>
//<Section title="Step One">
//Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//screen and then come back to see your edits.
//</Section>
//<Section title="See Your Changes">
//<ReloadInstructions />
//</Section>
//<Section title="Debug">
//<DebugInstructions />
//</Section>
//<Section title="Learn More">
//Read the docs to discover what to do next:
//</Section>
//<LearnMoreLinks />
//</View>
//</ScrollView>
//</SafeAreaView>
//);
//};

const Stack = createStackNavigator()

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
})

const MainStack = () => {
  const dispatch = useDispatch()
  const init = async () => {
    const authorizationStatus = await messaging().requestPermission()

    console.log('Permission status:', authorizationStatus)
    //if (authorizationStatus) {
    //messaging()
    //.getInitialNotification()
    //.then(remoteMessage => {
    //if (remoteMessage) {
    //(remoteMessage as any).go = true
    //dispatch(messageActions.notificationMessage(remoteMessage))
    ////console.log(
    ////'Notification caused app to open from quit state:',
    ////remoteMessage.notification,
    ////);
    ////setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
    //}
    ////setLoading(false);
    //});
    //}
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Prepare" component={PrepareScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="ArticleList" component={ArticleListScreen} />
    </Stack.Navigator>
  )
}

DefaultTheme.colors.primary = '#888'

//export default App;
export default class App extends Component<{}> {
  async updateConfirm() {
    if (
      await confirm({
        title: 'App đã được cập nhật',
        content: 'Bạn có muốn cập nhật ngay bây giờ không?',
      })
    ) {
      codePush.restartApp()
    }
  }

  codePushStatusDidChange(status: codePush.SyncStatus) {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates.')
        break
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading package.')
        break
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.')
        break
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('Up-to-date.')
        break
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.')
        this.updateConfirm().catch(e => {
          console.log('update error', e)
        })
        break
    }
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer ref={navigationRef} theme={DefaultTheme}>
          <MainStack />
        </NavigationContainer>
      </Provider>
    )
  }
}
