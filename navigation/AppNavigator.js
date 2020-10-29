import React from 'react';
import { useSelector } from 'react-redux';
import  {NavigationContainer} from '@react-navigation/native'

import {AuthNavigator, ShopNavigator, } from './ShopNavigator';
import StartupScreen from '../screens/user/StartupScreen'



const AppNavigator = props => {
  
  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => !!state.auth.didTryAutoLogin);

  

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {didTryAutoLogin && !isAuth && <AuthNavigator />}
      {!didTryAutoLogin && !isAuth && <StartupScreen />}
      
      
    </NavigationContainer>
  )
  
};

export default AppNavigator;
