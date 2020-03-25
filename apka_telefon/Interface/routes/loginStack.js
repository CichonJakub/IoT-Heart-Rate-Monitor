import React from 'react';
import { HeaderBackButton } from 'react-navigation-stack';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/login';
import Register from '../screens/register';


const screens = {
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      headerShown: false,
    },
  },
}

const LoginStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#000',
    headerStyle: { backgroundColor: '#90caf9', height: 70}
  }
});

export default LoginStack;
