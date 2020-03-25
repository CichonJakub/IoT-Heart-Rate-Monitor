import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import StatisticsStack from './statisticsStack';
import HomeStack from './homeStack';
import ResultStack from './resultStack';
import Tabs from '../screens/tabs';

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  Statistics: {
    screen: StatisticsStack,
  },
  Result: {
    screen: ResultStack,
  },
},
  {
    initialRouteName: 'Home',
    unmountInactiveRoutes: true,
    headerMode: "none",
  }
)

export default DrawerNavigator;
