import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
	Dimensions,
	Alert,
} from 'react-native';
import Gestures from 'react-native-easy-gestures';


import ViewShot from "react-native-view-shot";
import Logotitle from '../../commons/Logotitle/Logotitle';
import MainButton from '../../commons/MainButton/MainButton';
import Filter from '../../commons/Filter/Filter';
import EditorBar from './editor/EditorBar';
import EditorContent from './editor/EditorContent';

import { Options } from '../../../data/EditionOptions';
import { STYLES } from '../../../styles';

class PhotoEditor extends React.Component {
  static navigationOptions = (props) => {
    const { navigate, getParam} = props.navigation;
    const filter = getParam('filter');
		const image = getParam('image');
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
		} = this.state;
    const { getParam} = this.props.navigation;
    const filter = getParam('filter');
		const image = getParam('image');
		const verse = getParam('verse');
		const { width } = Dimensions.get('window');
		
    return (
			<ViewShot
				ref={(el) => { this.viewShot = el }}
				options={{ format: "jpg", quality: 0.9 }}
				style={styles.canvas}
			>
				<View
					style={[styles.image, { width, height: width }]}
				>
					<Filter name={filter}>
						<Image
							source={{ uri: image.uri }}
							style={{ width, height: width }}
						/>
					</Filter>
					<Gestures
						rotatable
						scalable={{
							min: 0.5,
							max: 5,
						}}
					>
						<View style={[styles.verse]}>
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
								]}
							>{verse.text}</Text>
							<Text
								style={[
									styles.verseText,
									{ fontFamily: selectedFontVerse },
									{ color: selectedFontColor },
									{ opacity: fontOpacity },
									{ fontSize },
									{ lineHeight: fontLineHeight },
									{ letterSpacing: fontLetterSpacing },
								]}
							>{`${verse.book_name} ${verse.chapter}:${verse.verse}`}</Text>
						</View>
					</Gestures>
				</View>
			</ViewShot>
    );
	}
	
	onChangeButton = (option) => {
		const { barOptions } = this.state;
		const newOptions = barOptions.map((optionSaved) => {
			optionSaved.isSelected = optionSaved.name === option;
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
	
  render() {
		const {
			barOptions,
			tabSelected,
			selectedFontVerse,
			selectedFontColor,
			fontOpacity,
		} = this.state;
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
		}

    return (
      <View style={styles.container}>
				{this.renderImage()}
				<EditorContent
					selectedTab={tabSelected}
					fontSettings={fontSettings}
					colorSettings={colorSettings}
					adjustsSettings={adjustsSettings}
				/>
				<EditorBar
					options={barOptions}
					onChangeButton={this.onChangeButton}
				/>
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
	verse: {
		position: 'absolute',
		bottom: STYLES.padding.global,
		left: STYLES.padding.global,
		right: STYLES.padding.global,
		padding: STYLES.padding.global,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
