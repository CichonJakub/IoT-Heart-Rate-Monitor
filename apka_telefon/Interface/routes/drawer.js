import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import StatisticsStack from './statisticsStack';
import HomeStack from './homeStack';

const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  Statistics: {
    screen: StatisticsStack,
  }
})

export default createAppContainer(RootDrawerNavigator);
