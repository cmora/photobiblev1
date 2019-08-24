import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
	Platform,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import Logotitle from '../../commons/Logotitle/Logotitle';
import Bible from '../../pages/Tabs/Bible';
import Promises from '../../pages/Tabs/Promises';
import DailyVerse from '../../pages/Tabs/DailyVerse';
import { STYLES } from '../../../styles';

class BibleTabs extends React.Component {
  static navigationOptions = (props) => {
    return {
      headerTitle: <Logotitle title="PHOTOBIBLE" />,
      headerRight: null,
    }
  }

  state = {
		index: 0,
    routes: [
      { key: 'bible', title: 'Biblia' },
			{ key: 'promises', title: 'Promesas' },
			{ key: 'daily', title: 'Del día' },
    ],
  }
  
  useVerseHanlder = (verse) => {
    const { navigate, getParam} = this.props.navigation;
    const filter = getParam('filter');
    const image = getParam('image');
    navigate('PhotoEditor', {
      filter,
      image,
      verse,
    });
  }

  onSelectSticker = sticker => {
    const { navigate, getParam} = this.props.navigation;
    const filter = getParam('filter');
    const image = getParam('image');
    navigate('PhotoEditor', {
      filter,
      image,
      sticker,
    });
  }

	renderBible = () => (
		<Bible useVerseHanlder={this.useVerseHanlder} />
  );
  
	renderPromises = () => (
		<Promises useVerseHanlder={this.useVerseHanlder} />
	);
	
	renderDailyVerse = () => (
    <DailyVerse
      useVerseHanlder={this.useVerseHanlder}
      onSelectSticker={this.onSelectSticker}
    />
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
						bible: this.renderBible,
						promises: this.renderPromises,
						daily: this.renderDailyVerse,
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
		paddingBottom: Platform.OS === 'ios' ? 35 : 0,
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
