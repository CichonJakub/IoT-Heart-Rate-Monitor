import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Result from '../screens/result';
import Images from '../screens/images';
import Videos from '../screens/videos';
import Advice from '../screens/advice';
import MainHeader from '../styles/header';
import  { MeasureHeader } from '../styles/header';
import Tabs from '../screens/tabs';

const screens = {
  Wynik: {
    screen: Result,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => <MainHeader navigation={navigation} title='Hello screen' />,
      title: 'Wynik',
      }
    }
  },

  Tabs: {
    screen: Tabs,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => <MeasureHeader navigation={navigation} title='Hello screen' />,
      title: '',
      }
    }
  },

}

const ResultStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#000',
    headerTitleStyle: { fontFamily: 'rubik-medium', fontSize: 20, paddingLeft: 8},
    headerStyle: { backgroundColor: '#5d99c6', height: 80 }
  }
});

export default ResultStack;
