import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  CameraRoll,
  Dimensions,
  ActivityIndicator,
	Platform,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import Logotitle from '../../commons/Logotitle/Logotitle';
import Button from '../../commons/Button/Button';
import Bible from '../../pages/Tabs/Bible';
import { STYLES } from '../../../styles';

class BibleTabs extends React.Component {
  static navigationOptions = (props) => {
    const { navigate, getParam} = props.navigation;
    const filter = getParam('filter');
    const image = getParam('image');
    return {
      headerTitle: <Logotitle title="PHOTOBIBLE" />,
      headerRight: null,
    }
  }

  state = {
		index: 0,
    routes: [
      { key: 'bible', title: 'Bíblico' },
			{ key: 'second', title: 'Promesas' },
			{ key: 'third', title: 'Del día' },
    ],
  }
  
  useVerseHanlder = (verse) => {
    Alert.alert(`${verse.book_name} ${verse.chapter}:${verse.verse}`)
  }

	renderBIble = () => (
		<Bible useVerseHanlder={this.useVerseHanlder} />
  );
  
	SecondRoute = () => (
		<View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
	);
	
	ThirdRoute = () => (
		<View style={[styles.scene, { backgroundColor: 'red' }]} />
  );
  
  renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        activeColor={STYLES.color.primary}
        indicatorStyle={{ backgroundColor: STYLES.color.primary }}
      />
    );
  };
	
  render() {
    return (
      <View style={styles.container}>
        <TabView
					navigationState={this.state}
					tabBarPosition='bottom'
					renderScene={SceneMap({
						bible: this.renderBIble,
						second: this.SecondRoute,
						third: this.ThirdRoute,
          })}
          renderTabBar={this.renderTabBar}
					onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
          activeColor="red"
				/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: STYLES.color.gray,
    flex: 1,
    flexDirection: 'column',
		justifyContent: 'center',
		paddingBottom: Platform.OS === 'ios' ? 30 : 0,
  },
  tabbar: {
    backgroundColor: STYLES.color.gray,
    ...STYLES.shadows.bottom,
  },
  image: {
    marginBottom: 20,
	},
	scene: {
    flex: 1,
  },
});

export default BibleTabs;
