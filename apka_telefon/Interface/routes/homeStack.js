import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/home';
import Measure from '../screens/measure';
import Header from '../shared/header';


const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} title='Hello screen' />,
      }
    }
  },
  Measure: {
    screen: Measure,
    navigationOptions: {
      title: "Pomiar"
    },
  },
}

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#000',
    headerStyle: { backgroundColor: '#78d6f9', height: 70}
  }
});

export default HomeStack;
