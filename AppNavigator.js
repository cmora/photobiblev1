import { StackNavigator } from 'react-navigation';

import Splash from './src/components/Splash/';

export default Root = StackNavigator({
  Splash: {
    screen: Splash,
  },
}, {
  initialRouteName: 'Splash'
});