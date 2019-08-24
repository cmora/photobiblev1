import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
	Dimensions,
	TouchableOpacity,
} from 'react-native';

import { CustomFonts } from '../../../../data/Fonts';
import { STYLES } from '../../../../styles';

class EditorFont extends React.Component {
  state = {
		fonts: CustomFonts,
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
		const { item } = element;
		const { onSelectFontVerse } = this.props;
		const { fontSelected } = this.state;
		const isSelected = fontSelected === item.name;
    const color = isSelected ? STYLES.color.primary : STYLES.color.text;
    const name = item.name.split('-');
		return (
			<TouchableOpacity
				onPress={() => {
					this.scrollToIndex(item);
					if (onSelectFontVerse) onSelectFontVerse(item.name);
				}}
				style={styles.fontItem}
			>
				<Text
					style={[
						styles.fontItemText,
						{ fontFamily: item.name, color }
					]}
				>{name[0]}</Text>
			</TouchableOpacity>
		);
	}
	
  render() {
    return (
      <View style={styles.container}>
				<FlatList
					ref={(list) => { this.list = list }}
					data={this.state.fonts}
					keyExtractor={(item) => item.name}
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
		alignItems: 'center',
		flexDirection: 'row',
    justifyContent: 'center',
    width: 'auto', paddingHorizontal: 20,
    height: 50,
    alignSelf: 'center',
	},
	fontItemText: {
		color: STYLES.color.text,
		fontSize: 14,
		textAlign: 'center',
	}
});

export default EditorFont;
