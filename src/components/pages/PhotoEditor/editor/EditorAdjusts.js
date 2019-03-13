import React from 'react';
import {
  StyleSheet,
	View,
	Text,
  FlatList,
	Dimensions,
	TouchableOpacity,
	Slider,
} from 'react-native';

import { find } from 'lodash';
import { colors } from '../../../../data/Colors';
import { STYLES } from '../../../../styles';


class EditorAdjusts extends React.Component {

  state = {
		fontSize: 16,
		lineheight: 20,
		letterSpacing: 0,
	};

  render() {
		const { onFontSizeChange, onLineHeightChange, onLetterSpacingChange } = this.props;
    return (
      <View style={styles.container}>
				<View style={styles.sliderSizeContainer}>
					<Text style={styles.iconSize}>A<Text style={styles.iconSizeSmall}>A</Text></Text>
					<Slider 
						style={styles.sliderSize}
						maximumValue={50}
						minimumValue={10} 
						step={1} 
						value={this.state.fontSize}
						minimumTrackTintColor={STYLES.color.primary}
						onValueChange={(val) => onFontSizeChange(val)}
					/>
				</View>
				<View style={styles.row}>
					<View style={[styles.column, styles.columnLeft]}>
						<View style={styles.iconLineHeight}>
							<Text style={styles.iconLineHeightText}>A</Text>
							<Text style={styles.iconLineHeightText}>A</Text>
						</View>
						<Slider 
							style={styles.sliderSmall}
							maximumValue={50}
							minimumValue={10} 
							step={1} 
							value={this.state.lineheight}
							minimumTrackTintColor={STYLES.color.primary}
							onValueChange={(val) => onLineHeightChange(val)}
						/>
					</View>
					<View style={[styles.column, styles.columnRight]}>
						<View>
							<Text style={styles.iconLetterSpacing}>AA</Text>
						</View>
						<Slider 
							style={styles.sliderSmall}
							maximumValue={30}
							minimumValue={-5} 
							step={0} 
							value={this.state.letterSpacing}
							minimumTrackTintColor={STYLES.color.primary}
							onValueChange={(val) => onLetterSpacingChange(val)}
						/>
					</View>
				</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		height: 100,
		paddingTop: 10,
		width: '100%',
		paddingHorizontal: STYLES.padding.global,
	},
	sliderSize: {
		width: (Dimensions.get('window').width - (STYLES.padding.global * 2)) - 30,
	},
	sliderSizeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	iconSize: {
		color: STYLES.color.text,
		fontSize: 18,
	},
	iconSizeSmall: {
		fontSize: 12,		
	},
	iconLetterSpacing: {
		color: STYLES.color.text,
		fontSize: 16,		
	},
	iconLineHeight: {
		width: 30,
		height: 20,
		position: 'relative',
	},
	iconLineHeightText: {
		lineHeight: 10,
		color: STYLES.color.text,
		fontSize: 12,		
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	column: {
		width: '50%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	sliderSmall: {
		width: ((Dimensions.get('window').width / 2) - (STYLES.padding.global * 2)) - 20,	
	},
	columnLeft: {
		paddingRight: 8,
	},
	columnRight: {
		paddingLeft: 8,
	}
});

export default EditorAdjusts;
