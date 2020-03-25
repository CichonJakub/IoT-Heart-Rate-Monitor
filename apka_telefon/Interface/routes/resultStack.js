import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Result from '../screens/result';
import Images from '../screens/images';
import Videos from '../screens/videos';
import Advice from '../screens/advice';
import Header from '../styles/header';
import Tabs from '../screens/tabs';

const screens = {
  Result: {
    screen: Result,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} title='Wynik' />,
      }
    }
  },

  Tabs: {
    screen: Tabs,
    navigationOptions: {
      title: ""
    },
  },
}

const ResultStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: { backgroundColor: '#90caf9', height: 70}
  }
});

export default ResultStack;
