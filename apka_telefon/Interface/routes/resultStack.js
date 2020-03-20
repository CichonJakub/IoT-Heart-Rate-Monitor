import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Result from '../screens/result';
import Images from '../screens/images';
import Videos from '../screens/videos';
import Advice from '../screens/advice';
import Header from '../shared/header';


const screens = {
  Result: {
    screen: Result,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} title='Wynik' />,
      }
    }
  },
  Images: {
    screen: Images,
    navigationOptions: {
      title: "Obrazki"
    },
  },
  Videos: {
    screen: Videos,
    navigationOptions: {
      title: "Wideo"
    },
  },
  Advice: {
    screen: Advice,
    navigationOptions: {
      title: "Porady"
    },
  },
}

const ResultStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: { backgroundColor: '#78d6f9', height: 70}
  }
});

export default ResultStack;
