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
  Button,
	Platform,
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';

import Logotitle from '../../commons/Logotitle/Logotitle';
import MainButton from '../../commons/MainButton/MainButton';
import { STYLES } from '../../../styles';
import Share from 'react-native-share'

class SharePhoto extends React.Component {
  static navigationOptions = (props) => {
    return {
      headerTitle: <Logotitle title="Compartir" />,
      headerRight: null,
    }
  }

  state = {
		
	}
	
	saveToCameraRoll = (image) => {
		if (Platform.OS === 'android') {
			RNFetchBlob
				.config({
					fileCache : true,
					appendExt : 'jpg'
				})
				.fetch('GET', image)
				.then((res) => {
					CameraRoll.saveToCameraRoll(res.path())
						.then(Alert.alert('Success', 'Photo added to camera roll!'))
						.catch(err => console.log('err:', err))
				})
		} else {
				CameraRoll.saveToCameraRoll(image)
					.then(Alert.alert('Success', 'Photo added to camera roll!'))
		}
	}

	share = () => {
		const { getParam } = this.props.navigation;
		const image = getParam('image');
		RNFetchBlob.fs.readFile(image, 'base64')
			.then((data) => {
				let shareOptions = {
					// title: "React Native Share Example",
					// message: "Check out this photo!",
					url: `data:image/jpg;base64,${data}`,
					// subject: "Check out this photo!"
				}
				Share.open(shareOptions)
					.then((res) => console.log('res:', res))
					.catch(err => console.log('err', err))
			})
	}
  
  renderImage = () => {
    const { getParam } = this.props.navigation;
		const image = getParam('image');
		const { width } = Dimensions.get('window');
    return (
			<Image
				source={{ uri: image }}
				style={{ width, height: width }}
			/>
    );
  }
	
  render() {
    return (
      <View style={styles.container}>
				{this.renderImage()}
				<View style={styles.shareButton}>
					<MainButton
						onPressHandler={this.share}
						label="SHARE"
					/>
				</View>
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
});

export default SharePhoto;
