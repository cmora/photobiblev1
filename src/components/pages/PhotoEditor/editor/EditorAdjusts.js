import React from 'react';
import {
  StyleSheet,
	View,
	Text,
	Dimensions,
} from 'react-native';

import { colors } from '../../../../data/Colors';
import IconAlign from '../../../commons/IconAlign/IconAlign';
import IconTextTransform from '../../../commons/IconTextTransform/IconTextTransform';
import IconVerse from '../../../commons/IconVerse/IconVerse';
import IconShadow from '../../../commons/IconShadow/IconShadow';
import { STYLES } from '../../../../styles';
import SliderWrapper from '../../../commons/SliderWrapper/SliderWrapper';


class EditorAdjusts extends React.Component {

  state = {
		fontSize: 16,
		lineheight: 20,
		letterSpacing: 0,
	};

  render() {
		const {
      onFontSizeChange,
      onLineHeightChange,
      onLetterSpacingChange,
      onAlignChange,
      onTextTransformChange,
      onDisplayVerseChange,
      onDisplayShadowChange,
      textAlign,
      textTransform,
      displayVerse,
      displayShadow,
    } = this.props;

    return (
      <View style={styles.container}>
				<View style={styles.sliderSizeContainer}>
					<Text style={styles.iconSize}>A<Text style={styles.iconSizeSmall}>A</Text></Text>
					<SliderWrapper 
						style={styles.sliderSize}
						maximumValue={50}
						minimumValue={10} 
						step={2} 
						value={this.state.fontSize}
						minimumTrackTintColor={STYLES.color.primary}
						onValueChange={onFontSizeChange}
					/>
				</View>
				<View style={styles.row}>
					<View style={[styles.column, styles.columnLeft]}>
						<View style={styles.iconLineHeight}>
							<Text style={styles.iconLineHeightText}>A</Text>
							<Text style={styles.iconLineHeightText}>A</Text>
						</View>
						<SliderWrapper 
							style={styles.sliderSmall}
							maximumValue={50}
							minimumValue={10} 
							step={2} 
							value={this.state.lineheight}
							minimumTrackTintColor={STYLES.color.primary}
							onValueChange={onLineHeightChange}
						/>
					</View>
					<View style={[styles.column, styles.columnRight]}>
						<View>
							<Text style={styles.iconLetterSpacing}>AA</Text>
						</View>
						<SliderWrapper 
							style={styles.sliderSmall}
							maximumValue={20}
							minimumValue={-2} 
							step={1} 
							value={this.state.letterSpacing}
							minimumTrackTintColor={STYLES.color.primary}
							onValueChange={onLetterSpacingChange}
						/>
					</View>
				</View>
        <View style={[styles.row, styles.rowSettings]}>
          <IconAlign
            align={textAlign}
            onPressHandler={onAlignChange}
          />
          <IconTextTransform
            transform={textTransform}
            onPressHandler={onTextTransformChange}
          />
          <IconVerse
            display={displayVerse}
            onPressHandler={onDisplayVerseChange}
          />
          <IconShadow
            display={displayShadow}
            onPressHandler={onDisplayShadowChange}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		height: 120,
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
  },
  rowSettings: {
    justifyContent: 'space-around',
  }
});

export default EditorAdjusts;
