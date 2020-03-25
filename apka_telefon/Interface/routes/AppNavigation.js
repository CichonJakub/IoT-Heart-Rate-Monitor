import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import DrawerNavigator from './drawer';
import HomeStack from './homeStack';
import ResultStack from './resultStack';
import StatisticsStack from './statisticsStack';
import LoginStack from './loginStack';
import Login from '../screens/login';

const PrimaryNav = createStackNavigator({
  loginStack: { screen: LoginStack },
//  HomeStack: { screen: HomeStack },
  DrawerNavigator: { screen: DrawerNavigator }
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
})

export default createAppContainer(PrimaryNav);
