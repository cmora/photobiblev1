import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Splash from './src/components/pages/Splash/Splash';
import Home from './src/components/pages/Home/Home';
import Photo from './src/components/pages/Photo/Photo';
import Tabs from './src/components/pages/Tabs/Tabs';

import Button from './src/components/commons/Button/Button'
import { STYLES } from './src/styles';

const AppNavigator = createStackNavigator({
  Splash: { screen: Splash },
  Home: {
    screen: Home,
    navigationOptions: { gesturesEnabled: false },
  },
  Photo: { screen: Photo },
  Tabs: { screen: Tabs },
},
{
  mode: 'card',
  cardStyle: { backgroundColor: STYLES.color.gray },
  initialRouteName: 'Splash',
  defaultNavigationOptions: (props) => {
    const { goBack } = props.navigation;

    return {
      headerStyle: {
        backgroundColor: STYLES.color.gray,
        height: 60,
        borderBottomColor: STYLES.color.grayLight,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: (
        <Button
          onPressHandler={() => goBack(null)}
          arrow="left"
          label="Volver"
          style="clear"
        />
      ),
    } 
  },
});

const App = createAppContainer(AppNavigator);

export default App;

