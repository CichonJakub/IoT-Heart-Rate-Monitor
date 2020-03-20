import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import StatisticsStack from './statisticsStack';
import HomeStack from './homeStack';
import ResultStack from './resultStack';

const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  Statistics: {
    screen: StatisticsStack,
  },
  Result: {
    screen: ResultStack,
  }
})

export default createAppContainer(RootDrawerNavigator);
