import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import StatisticsStack from './statisticsStack';
import HomeStack from './homeStack';
import ResultStack from './resultStack';
import Tabs from '../screens/tabs';
import Sidebar from '../screens/sidebar';

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  Result: {
    screen: ResultStack,
  },
  Statistics: {
    screen: StatisticsStack,
  },
},
  {
    initialRouteName: 'Home',
    unmountInactiveRoutes: true,
    headerMode: "none",
    contentComponent: props => <Sidebar {...props} />,
    drawerBackgroundColor: 'transparent',
  }
)

export default DrawerNavigator;
