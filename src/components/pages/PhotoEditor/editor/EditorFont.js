import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import { find } from 'lodash';

import { CustomFonts } from '../../../../data/Fonts';
import { STYLES } from '../../../../styles';

const NUMBER_OF_TIME = Dimensions.get('window').width < 400 ? 4 : 5;

class EditorFont extends React.Component {

  state = {
		fonts: CustomFonts,
		fontItemWidth: (Dimensions.get('window').width / NUMBER_OF_TIME) - 10,
		fontSelected: CustomFonts[0].name,
	};

	scrollToIndex = (item) => {
		this.list.scrollToIndex({
			viewPosition: 0.5,
			index: this.state.fonts.indexOf(item),
		});
		this.setState({ fontSelected: item.name })
	}

	renderFontItem = (element) => {
		const width = this.state.fontItemWidth;
		const { item } = element;
		const { onSelectFontVerse } = this.props;
		const { fontSelected } = this.state;
		const isSelected = fontSelected === item.name;
		const color = isSelected ? STYLES.color.primary : STYLES.color.text;
		return (
			<TouchableOpacity
				onPress={() => {
					this.scrollToIndex(item);
					if (onSelectFontVerse) onSelectFontVerse(item.name);
				}}
				style={[styles.fontItem, { width }]}
			>
				<Text
					style={[
						styles.fontItemText,
						{ fontFamily: item.name, color }
					]}
				>Abcde</Text>
			</TouchableOpacity>
		);
	}
	
  render() {
		const { fontItemWidth } = this.state;
    return (
      <View style={styles.container}>
				<FlatList
					ref={(list) => { this.list = list }}
					data={this.state.fonts}
					keyExtractor={(item) => item.name}
					getItemLayout={(data, index) => (
						{length: fontItemWidth, offset: fontItemWidth * index, index}   
					)}
					horizontal={true}
					renderItem={this.renderFontItem}
					contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
					showsHorizontalScrollIndicator={false}
			/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		height: 120,
		flexDirection: 'column',
		alignItems: 'center',
	},
	fontItem: {
		paddingHorizontal: 5,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	fontItemText: {
		color: STYLES.color.text,
		fontSize: 14,
		textAlign: 'center',
	}
});

export default EditorFont;
