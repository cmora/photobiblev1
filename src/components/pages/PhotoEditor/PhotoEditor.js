import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  CameraRoll,
  Dimensions,
  ActivityIndicator,
	Platform,
} from 'react-native';

import ViewShot from "react-native-view-shot";
import Logotitle from '../../commons/Logotitle/Logotitle';
import MainButton from '../../commons/MainButton/MainButton';
import Filter from '../../commons/Filter/Filter';
import Bar from '../../pages/PhotoEditor/editor/Bar';

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
			<ViewShot ref={(el) => { this.viewShot = el }} options={{ format: "jpg", quality: 0.9 }}>
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
	
  render() {
    return (
      <View style={styles.container}>
				{this.renderImage()}
				<Bar items={['a', 'b']} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: STYLES.color.gray,
    flex: 1,
		paddingBottom: Platform.OS === 'ios' ? 30 : 0,
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
	}
});

export default PhotoEditor;
