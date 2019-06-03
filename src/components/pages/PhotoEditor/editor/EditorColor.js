import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
	Dimensions,
	TouchableOpacity,
} from 'react-native';

import { colors } from '../../../../data/Colors';
import { STYLES } from '../../../../styles';
import SliderWrapper from '../../../commons/SliderWrapper/SliderWrapper';


class EditorColor extends React.Component {

  state = {
		colors,
		colorSelected: colors[0],
		opacity: 1,
	};

	scrollToIndex = (item) => {
		this.list.scrollToIndex({
			viewPosition: 0.5,
			index: this.state.colors.indexOf(item),
		});
		this.setState({ colorSelected: item })
	}

	renderColorItem = (element) => {
		const { item } = element;
		const { onSelectColor } = this.props;
		const { colorSelected } = this.state;
		const isSelected = colorSelected === item;
		const backgroundColor = item;
		return (
			<TouchableOpacity
				activeOpacity={1}
				onPress={() => {
					this.scrollToIndex(item);
					if (onSelectColor) onSelectColor(item);
				}}
				style={[styles.colorItem, { backgroundColor }]}
			>
				{isSelected && (
					<View style={styles.selectedSqure} />
				)}		
			</TouchableOpacity>
		);
	}

  render() {
		const { onOpacityChange } = this.props;
    return (
      <View style={styles.container}>
				<View style={styles.colorContainer}>
					<FlatList
						ref={(list) => { this.list = list }}
						data={this.state.colors}
						keyExtractor={(item) => item}
						getItemLayout={(data, index) => (
							{length: 30, offset: 30 * index, index}   
						)}
						horizontal={true}
						renderItem={this.renderColorItem}
						contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
						showsHorizontalScrollIndicator={false}
					/>
				</View>
				<View style={styles.sliderContainer}>
          <SliderWrapper 
						style={styles.slider}
						maximumValue={1}
						minimumValue={0} 
						step={0.05} 
						value={this.state.opacity}
            minimumTrackTintColor={STYLES.color.primary}
            maximumTrackTintColor={STYLES.color.grayLight}
						onValueChange={onOpacityChange}
					/>
				</View>
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
	colorContainer: {
		height: 40,
	},
	colorItem: {
		width: 30,
		height: 40,
	},
	selectedSqure: {
		borderWidth: 4,
		borderColor: STYLES.color.primary,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	slider: {
		width: Dimensions.get('window').width - (STYLES.padding.global * 2),
	},
	sliderContainer: {
		marginTop: 10,
		paddingHorizontal: STYLES.padding.global,
		height: 40,
	}
});

export default EditorColor;
