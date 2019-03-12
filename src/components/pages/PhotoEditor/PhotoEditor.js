import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';

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
	}
	
	componentDidMount () {
		this.props.navigation.setParams({ saveFinalImage: this.saveFinalImage });
	}

	saveFinalImage = () => {
		this.viewShot.capture().then(uri => {
			this.props.navigation.navigate('SharePhoto', {
				image: uri,
			});
		});
	}

  renderImage = () => {
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
				<View style={styles.image}>
					<Filter name={filter}>
						<Image
							source={{ uri: image.uri }}
							style={{ width, height: width }}
						/>
					</Filter>
					<View style={styles.verse}>
						<Text style={styles.verseText}>{verse.text}</Text>
						<Text style={styles.verseText}>{`${verse.book_name} ${verse.chapter}:${verse.verse}`}</Text>
					</View>
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
	
  render() {
		const { barOptions, tabSelected } = this.state;
    return (
      <View style={styles.container}>
				{this.renderImage()}
				<EditorContent
					selectedTab={tabSelected}
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
		bottom: 10,
		left: 10,
		padding: 16,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
	},
	verseText: {
		color: '#fff',
		fontSize: 16,
		fontFamily: STYLES.fonts.montserrat,
	},
	canvas: {
		flex: 1,
		justifyContent: 'center',
	}
});

export default PhotoEditor;
