import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
	Dimensions,
} from 'react-native';
import get from 'lodash/get';
import Gestures from 'react-native-easy-gestures';


import ViewShot from "react-native-view-shot";
import Logotitle from '../../commons/Logotitle/Logotitle';
import MainButton from '../../commons/MainButton/MainButton';
import Filter from '../../commons/Filter/Filter';
import EditorBar from './editor/EditorBar';
import EditorContent from './editor/EditorContent';

import { Options } from '../../../data/EditionOptions';
import { STYLES } from '../../../styles';

import { hexToRgb } from '../../../utils/index';

class PhotoEditor extends React.Component {
  static navigationOptions = (props) => {
    const { getParam} = props.navigation;
		const saveFinalImage = getParam('saveFinalImage');
    return {
      headerTitle: <Logotitle title="PHOTOBIBLE" />,
      headerRight: (
        <MainButton
					onPressHandler={() => saveFinalImage()}
          arrow="right"
          label="Siguiente"
          theme="primary"
          style="clear"
        />
      ),
    }
  }

  state = {
		editedImage: null,
		tabSelected: 'Fuente',
		barOptions: Options,
		selectedFontVerse: STYLES.fonts.montserrat,
		selectedFontColor: '#ffffff',
		fontOpacity: 1,
		fontSize: 16,
		fontLineHeight: 20,
    fontLetterSpacing: 0,
    textAlign: 'center',
    textTransform: 'capitalize',
    displayVerse: 'passage',
    displayShadow: 'box',
    selectedShadowColor: '#000000',
    selectedShadowSize: '10',
    selectedShadowOpacity: '0.5',
	}
	
	componentDidMount () {
		this.props.navigation.setParams({ saveFinalImage: this.saveFinalImage });
		const newState = Options.map((item, index) => {
			item.isSelected = index === 0;
			return item;
		});
		this.setState({
			barOptions: newState,
		});
	}

	saveFinalImage = () => {
		this.viewShot.capture().then(uri => {
			this.props.navigation.navigate('SharePhoto', {
				image: uri,
			});
		});
	}

  renderImage = () => {
		const {
			selectedFontVerse,
			selectedFontColor,
			fontOpacity,
			fontSize,
			fontLineHeight,
      fontLetterSpacing,
      textAlign,
      textTransform,
      displayVerse,
      selectedShadowColor,
      selectedShadowSize,
      selectedShadowOpacity,
      displayShadow,
    } = this.state;
    const { getParam} = this.props.navigation;
    const filter = getParam('filter');
		const image = getParam('image');
    const verse = getParam('verse');
    const sticker = getParam('sticker');
    const { width } = Dimensions.get('window');
    let reference = get(verse, 'reference');
    let text = get(verse, 'text');

    if (textTransform === 'uppercase') {
      text = text.toUpperCase();
      reference = reference.toUpperCase();
    }
    if (textTransform === 'lowercase') {
      text = text.toLowerCase();
      reference = reference.toLowerCase();
    }

    const shadowColor = selectedShadowColor !== 'transparent'
      ? `rgba(${hexToRgb(selectedShadowColor)}, ${selectedShadowOpacity})`
      : 'transparent';
    
    const textShadowStyle = {
      textShadowOffset: {
        width: 2,
        height: 2,
      },
      textShadowRadius: Number(selectedShadowSize),
      textShadowColor: shadowColor,
    }

    let boxShadowStyle = {
      padding: 0,
      backgroundColor: 'transparent',
    };

    if (displayShadow === 'box') {
      boxShadowStyle = {
        backgroundColor: shadowColor,
        padding: 10,
      }
    }

    const { name: filterName, props } = filter;

    return (
      <View
        style={styles.canvas}
      >
        <ViewShot
          ref={(el) => { this.viewShot = el }}
          options={{ format: "jpg", quality: 0.9 }}
        >
          <View
            style={[styles.image, { width, height: width }]}
          >
            <Filter name={filterName} props={props}>
              <Image
                source={{ uri: image.uri }}
                style={{ width, height: width }}
              />
            </Filter>
            <Gestures
              style={styles.gestures}
              rotatable
              scalable={{
                min: 0.5,
                max: 5,
              }}
            >
              {verse && (
                <View
                  style={[
                    styles.verse,
                    boxShadowStyle,
                  ]
                }>
                  {displayVerse === 'passage' && (
                    <Text
                      style={[
                        styles.verseText,
                        styles.versePasage,
                        { fontFamily: selectedFontVerse },
                        { color: selectedFontColor },
                        { opacity: fontOpacity },
                        { fontSize },
                        { lineHeight: fontLineHeight },
                        { letterSpacing: fontLetterSpacing },
                        { textAlign },
                        displayShadow === 'text' ? textShadowStyle : null,
                      ]}
                    >
                      {text}
                    </Text>
                  )}
                  <Text
                    style={[
                      styles.verseText,
                      { fontFamily: selectedFontVerse },
                      { color: selectedFontColor },
                      { opacity: fontOpacity },
                      { fontSize },
                      { lineHeight: fontLineHeight },
                      { letterSpacing: fontLetterSpacing },
                      { textAlign },
                      displayShadow === 'text' ? textShadowStyle : null,
                    ]}
                  >
                    {reference}
                  </Text>
                </View>
              )}
              {sticker && (
                <View>
                  <Image
                    source={sticker}
                    style={{ width, height: width }}
                  />
                </View>
              )}
            </Gestures>
          </View>
        </ViewShot>
      </View>
    );
	}
	
	onChangeButton = (option) => {
		const { barOptions } = this.state;
		const newOptions = barOptions.map((optionSaved) => {
			optionSaved.isSelected = get(optionSaved, 'name') === option;
			return optionSaved;
		});
		this.setState({
			barOptions: newOptions,
			tabSelected: option,
		});
	}

	onSelectFontVerse = (font) => {
		this.setState({
			selectedFontVerse: font,
		});
	}

	onSelectColor = (color) => {
		this.setState({
			selectedFontColor: color,
		});
	}

	onOpacityChange = (opacity) => {
		this.setState({
			fontOpacity: opacity,
		});
	}

	onFontSizeChange = (size) => {
		this.setState({
			fontSize: size,
		});
	}

	onLineHeightChange = (lineHeight) => {
		this.setState({ fontLineHeight: lineHeight });
	}

	onLetterSpacingChange = (letterSpacing) => {
		this.setState({ fontLetterSpacing: letterSpacing });
  }
  
  onAlignChange = (align) => {
    this.setState({ textAlign: align });
  }
  
  onTextTransformChange = (transform) => {
    this.setState({ textTransform: transform });
  }
  
  onDisplayVerseChange = (display) => {
    this.setState({ displayVerse: display });
  }

  onDisplayShadowChange = (display) => {
    this.setState({ displayShadow: display });
  }
  
  onSelectShadowColor = (color) => {
		this.setState({ selectedShadowColor: color });
  }
  
  onShadowSizeChange = (size) => {
		this.setState({ selectedShadowSize: size });
  }
  
  onShadowOpacityChange = (opacity) => {
		this.setState({ selectedShadowOpacity: opacity });
	}
	
  render() {
		const {
			barOptions,
			tabSelected,
			selectedFontVerse,
			selectedFontColor,
      fontOpacity,
      textAlign,
      textTransform,
      displayVerse,
      displayShadow,
    } = this.state;

    const { getParam} = this.props.navigation;
    const sticker = getParam('sticker');
    
		const fontSettings = {
			currentFont: selectedFontVerse,
			onSelectFontVerse:this.onSelectFontVerse,
		}
		const colorSettings = {
			currentColor: selectedFontColor,
			onSelectColor: this.onSelectColor,
			onOpacityChange: this.onOpacityChange,
			currentOpacity: fontOpacity,
		}
		const adjustsSettings = {
			onFontSizeChange: this.onFontSizeChange,
			onLineHeightChange: this.onLineHeightChange,
      onLetterSpacingChange: this.onLetterSpacingChange,
      onAlignChange: this.onAlignChange,
      onTextTransformChange: this.onTextTransformChange,
      onDisplayVerseChange: this.onDisplayVerseChange,
      onDisplayShadowChange: this.onDisplayShadowChange,
      textAlign,
      textTransform,
      displayVerse,
      displayShadow,
    }
    
    const shadowSettings = {
      onSelectShadowColor: this.onSelectShadowColor,
      onShadowSizeChange: this.onShadowSizeChange,
      onShadowOpacityChange: this.onShadowOpacityChange,
      displayShadow,
    }

    return (
      <View style={styles.container}>
        {this.renderImage()}
        {!sticker && (
          <View>
            <EditorContent
              selectedTab={tabSelected}
              fontSettings={fontSettings}
              colorSettings={colorSettings}
              adjustsSettings={adjustsSettings}
              shadowSettings={shadowSettings}
            />
            <EditorBar
              options={barOptions}
              onChangeButton={this.onChangeButton}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: STYLES.color.gray,
    flex: 1,
		justifyContent: 'space-between',
  },
  gestures: {
    position: 'absolute',
    bottom: 0,
  },
	versePasage: {
		marginBottom: 10,
	},
	verseText: {
		color: '#fff',
		fontSize: 16,
		fontFamily: STYLES.fonts.montserrat,
    lineHeight: 20,
	},
	canvas: {
		flex: 1,
		justifyContent: 'center',
		overflow: 'hidden',
	},
	image: {
		overflow: 'hidden',
	}
});

export default PhotoEditor;
