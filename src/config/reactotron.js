import Reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const name = "app-registro-financas";
const host = "192.168.0.81";
console.tron = Reactotron;

Reactotron
  .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({host, name}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!