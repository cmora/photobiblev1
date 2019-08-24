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
import { STYLES } from '../../../styles';
import Share from 'react-native-share';

const ICON_SHARE = require('../../../../assets/images/icon-share.png');
const ICON_SAVE = require('../../../../assets/images/icon-save.png');
const LOGO_FOOTER = require('../../../../assets/images/logo-footer.png');

class SharePhoto extends React.Component {
  static navigationOptions = (props) => {
    return {
      headerTitle: <Logotitle title="Compartir" />,
      headerRight: null,
    }
  }

  state = {
		
	}
	
	saveToCameraRoll = () => {
    const { getParam, navigate } = this.props.navigation;
		const image = getParam('image');
		CameraRoll.saveToCameraRoll(image).then(() => {
      Alert.alert(
        'Imagen guardada',
        'La imagen ha sido guardada en tu galería',
        [
          {text: 'OK', onPress: () => navigate('Home')},
        ],
        {cancelable: false},
      );
    })
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
		const { width: width } = Dimensions.get('window');
    return (
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={{ width: width - 40, height: width - 40 }}
        />
      </View>
    );
  }
	
  render() {
    return (
      <View style={styles.container}>
        {this.renderImage()}
        <Text style={styles.title}>GUARDAR O COMPARTIR</Text>
        <View style={styles.footer}>
          <View style={styles.actions}>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={this.share}
                style={styles.buttonWrapper}
              >
                <View style={styles.icon}>
                  <Image
                    style={styles.imgIcon}
                    source={ICON_SHARE}
                  />
                </View>
                <Text style={styles.text}>COMPARTIR</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={this.saveToCameraRoll}
                style={styles.buttonWrapper}
              >
                <View style={styles.icon}>
                  <Image
                    style={styles.imgIcon}
                    source={ICON_SAVE}
                  />
                </View>
                <Text style={styles.text}>GUARDAR</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.logoContainer}>
            <Image
              source={LOGO_FOOTER}
              style={styles.logo}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: STYLES.color.gray,
    flex: 1,
    paddingBottom: Platform.OS === 'ios' ? 35 : 0,
    paddingTop: 30,
  },
  title: {
    textAlign: 'center',
    color: STYLES.color.text,
    fontFamily: STYLES.fonts.montserrat,
    fontSize: 20,  
    marginVertical: 20,
  },
  imageContainer: {
    backgroundColor: STYLES.color.grayDark,
    margin: 20,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.8,
        shadowRadius: 18,
        shadowColor: '#000000',
        shadowOffset: { height: 0, width: 0 },
      },
      android: {
        elevation: 5,
        position:'relative',
      },
    }),
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  actions: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },
  button: {
    marginHorizontal: 20,
  },
  buttonWrapper: {
    flex: 0,
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: STYLES.color.primary,
    padding: 15,
    marginBottom: 10,
  },
  imgIcon: {
    width: 30,
    height: 30,
  },
  text: {
    color: STYLES.color.text,
    fontFamily: STYLES.fonts.montserrat,
    fontSize: 14,
  },
  logo: {
    width: 108,
    height: 74,
  },
});

export default SharePhoto;
