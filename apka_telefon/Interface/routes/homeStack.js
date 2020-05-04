import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialIcons } from '@expo/vector-icons';
import Home from '../screens/home';
import Measure from '../screens/measure';
import Result from '../screens/result';
import  MainHeader  from '../styles/header';
import  { MeasureHeader } from '../styles/header';


const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => <MainHeader navigation={navigation} title='Hello screen' />,
      title: 'PulsApka',
      }
    }
  },
  Measure: {
    screen: Measure,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => <MeasureHeader navigation={navigation} title='Hello screen' />,
      title: 'PulsApka',
      }
    }
  },
}

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#000',
    headerTitleStyle: { fontFamily: 'rubik-medium', fontSize: 20, paddingLeft: 8},
    headerStyle: { backgroundColor: '#5d99c6', height: 80 }
  }
});

export default HomeStack;
