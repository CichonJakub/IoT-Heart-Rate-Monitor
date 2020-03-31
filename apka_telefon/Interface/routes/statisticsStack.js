import { createStackNavigator } from 'react-navigation-stack';
import Statistics from '../screens/statistics';
import MainHeader from '../styles/header';
import React from 'react';

const screens = {
  Statystyki: {
    screen: Statistics,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => <MainHeader navigation={navigation} title='Hello screen' />,
      title: 'Statystyki',
      }
    }
  },
}

const StatisticsStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#000',
    headerTitleStyle: { fontFamily: 'rubik-medium', fontSize: 20, paddingLeft: 8},
    headerStyle: { backgroundColor: '#5d99c6', height: 80 }
  }
});

export default StatisticsStack;
