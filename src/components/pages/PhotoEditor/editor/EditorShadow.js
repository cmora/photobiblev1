import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
	Dimensions,
	TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';

import { colorsShadow } from '../../../../data/Colors';
import { STYLES } from '../../../../styles';
import SliderWrapper from '../../../commons/SliderWrapper/SliderWrapper';

const ICON_TRANSPARENT = require('../../../../../assets/images/icon-transparent.png');
const ICON_SHADOW_SIZE = require('../../../../../assets/images/icon-shadow-size.png');
const ICON_SHADOW_OPACITY = require('../../../../../assets/images/icon-shadow-opacity.png');

colorsShadow.unshift('transparent');

class EditorShadow extends React.Component {
  constructor(props) {
    super(props);
    this.currentColor = '#000000';
    const currentIndex = colorsShadow.indexOf(this.currentColor);

    this.state = {
      colors: colorsShadow,
      currentShadowColor: colorsShadow[currentIndex],
      opacity: 1,
    };
  }


  componentDidMount() {
    setTimeout(() => {
      this.scrollToIndex(this.currentColor); 
    }, 500);
  }
  
	scrollToIndex = (item) => {
		this.list.scrollToIndex({
			viewPosition: 0.5,
			index: this.state.colors.indexOf(item),
		});
		this.setState({ currentShadowColor: item })
	}

	renderColorItem = (element) => {
		const { item } = element;
		const { onSelectShadowColor } = this.props;
		const { currentShadowColor } = this.state;
		const isSelected = currentShadowColor === item;
    const backgroundColor = item;
		return (
			<TouchableOpacity
				activeOpacity={1}
				onPress={() => {
					this.scrollToIndex(item);
					if (onSelectShadowColor) onSelectShadowColor(item);
				}}
				style={[styles.colorItem, { backgroundColor }]}
			>
        {backgroundColor === 'transparent' && (
          <ImageBackground source={ICON_TRANSPARENT} style={styles.noneSquare} />
        )}
				{isSelected && (
					<View style={styles.selectedSqure} />
				)}
			</TouchableOpacity>
		);
	}

  render() {
		const { onShadowSizeChange, onShadowOpacityChange, displayShadow } = this.props;
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
        <View style={styles.row}>
          {displayShadow === 'text' && (
            <View style={[styles.column, styles.columnLeft]}>
              <Image
                source={ICON_SHADOW_SIZE}
                style={[styles.iconShadowSize, styles.iconImage]}
              />
              <SliderWrapper 
                style={styles.sliderSmall}
                maximumValue={10}
                minimumValue={0} 
                step={1}
                value={5}
                minimumTrackTintColor={STYLES.color.primary}
                onValueChange={onShadowSizeChange}
              />
            </View>
          )}
					<View style={[
            styles.column,
            styles.columnRight,
            displayShadow === 'box' ? styles.columnFull : null,
          ]}>
            <Image
              source={ICON_SHADOW_OPACITY}
              style={[styles.iconShadowOpacity, styles.iconImage]}
            />
						<SliderWrapper 
							style={[
                displayShadow === 'box' ? styles.sliderFull : styles.sliderSmall,
              ]}
							maximumValue={1}
							minimumValue={0} 
							step={0.1}
							value={0.5}
							minimumTrackTintColor={STYLES.color.primary}
							onValueChange={onShadowOpacityChange}
						/>
					</View>
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
  noneSquare: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
    bottom: 0,
    opacity: 0.2,
  },
	slider: {
		width: Dimensions.get('window').width - (STYLES.padding.global * 2),
	},
	sliderContainer: {
		marginTop: 10,
		paddingHorizontal: STYLES.padding.global,
		height: 40,
  },
  row: {
		flexDirection: 'row',
		alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginVertical: 10,
	},
	column: {
		width: '50%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
  },
  columnFull: {
    width: '100%',
  },
  sliderFull: {
		width: (Dimensions.get('window').width - (STYLES.padding.global * 2)) - 50,
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
  iconImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  }
});

export default EditorShadow;
