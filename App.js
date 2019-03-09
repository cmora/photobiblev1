import { createStackNavigator, createAppContainer } from "react-navigation";
import Splash from './src/components/pages/Splash/Splash';
import Home from './src/components/pages/Home/Home';
import Photo from './src/components/pages/Photo/Photo';
import { STYLES } from './src/styles';

const AppNavigator = createStackNavigator({
  Splash: {
    screen: Splash
  },
  Home: {
    screen: Home,
    navigationOptions: { gesturesEnabled: false },
  },
  Photo: {
    screen: Photo
  },
},
{
  mode: 'modal',
  cardStyle: { backgroundColor: STYLES.color.gray },
  initialRouteName: 'Splash',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: STYLES.color.gray,
      height: 60
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

const App = createAppContainer(AppNavigator);

export default App;

