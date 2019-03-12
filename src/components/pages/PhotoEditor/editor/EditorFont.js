import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
	Dimensions,
	TouchableOpacity,
} from 'react-native';

import { STYLES } from '../../../../styles';

class EditorFont extends React.Component {

  state = {
		datas: [{key: 0, text: "Hello"}, {key: 1, text: "World"},{key: 0, text: "Hello"}, {key: 1, text: "World"},{key: 0, text: "Hello"}, {key: 1, text: "World"},{key: 0, text: "Hello"}, {key: 1, text: "World"},{key: 0, text: "Hello"}, {key: 1, text: "World"}],
	}
	
	componentDidMount() {
		this.list.scrollToOffset({
			offset: -Dimensions.get('window').width / 2,
		});
	}

	scrollToIndex = (item) => {
		this.list.scrollToIndex({
			viewPosition: 0.5,
			index: this.state.datas.indexOf(item),
		});
	}
	
  render() {
    return (
      <View style={styles.container}>
				<FlatList
					ref={(list) => { this.list = list }}
					data={this.state.datas}
					keyExtractor={(item) => item.key}
					// getItemLayout={(data, index) => (
					// 		// Max 5 items visibles at once
					// 		{length: Dimensions.get('window').width / 5, offset: Dimensions.get('window').width / 5 * index, index}   
					// )}
					// initialScrollIndex={9}
          // initialNumToRender={2}
					horizontal={true}
					renderItem={ ({item}) =>
							<TouchableOpacity
									onPress={() => this.scrollToIndex(item)}
									style={styles.cell}>
									<Text>{item.text}</Text>
							</TouchableOpacity>
					}
					contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
			/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
	},

});

export default EditorFont;
