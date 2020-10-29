import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import ShopNavigator from './navigation/ShopNavigator'
import AppNavigator from './navigation/AppNavigator'
import ReduxThunk from 'redux-thunk'
import * as Notifications from 'expo-notifications'
//import { composeWithDevTools } from 'redux-devtools-extension'

import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/orders'
import authReducer from './store/reducers/auth'
import { enableScreens } from 'react-native-screens';


enableScreens();

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {  shouldShowAlert: true }
  }
})


const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
})

//const store = createStore(rootReducer, composeWithDevTools())
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    
    <Provider store={store}>
      <AppNavigator />      
    </Provider>
    
  );
}
//47513212

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
