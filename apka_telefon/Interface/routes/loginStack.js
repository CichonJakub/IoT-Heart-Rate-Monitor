import React from 'react';
import { HeaderBackButton } from 'react-navigation-stack';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/login';
import Register from '../screens/register';
import Err_reg from '../screens/err_reg';
import Err_log from '../screens/err_log';
import Wait from '../screens/wait';

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

  Err_reg: {
    screen: Err_reg,
    navigationOptions: {
      headerShown: false,
    },
  },

  Err_log: {
    screen: Err_log,
    navigationOptions: {
      headerShown: false,
    },
  },  

  Wait: {
    screen: Wait,
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
