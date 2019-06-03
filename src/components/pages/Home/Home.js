import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  CameraRoll,
  Dimensions,
  ActivityIndicator,
  Platform,
  PermissionsAndroid
} from 'react-native';

import ImagePicker from 'react-native-image-picker';


import { STYLES } from '../../../styles';

const LOGO = require('../../../../assets/images/logo.png');

class Home extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
  }

  state = {
    photosLoaded: false,
    photos: [],
    index: null,
    hasNextPage: true,
    endCursor: null,
  }

  componentDidMount() {
    this.getPhotos();
  }

  async requestExternalStoreageRead() {
    try {
      if (Platform.OS === 'ios') return true;
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          'title': 'Cool App ...',
          'message': 'App needs access to external storage'
        }
      );
      return granted == PermissionsAndroid.RESULTS.GRANTED
    } catch (err) {
      return false;
    }
  }

  getPhotos = async () => {
    if (await this.requestExternalStoreageRead()) {
      const { hasNextPage, endCursor } = this.state;
      if (hasNextPage) {
        const params = {
          first: 40,
          groupTypes: 'SavedPhotos',
          assetType: 'Photos',
        };

        if (endCursor) {
          params.after = endCursor;
        }

        if (Platform.OS === 'android') {
          delete params.groupTypes;
        }

        CameraRoll.getPhotos(params)
          .then(r => this.storeImages(r))
          .catch((err) => console.log(err));
      }
    }
  }

  androidRequestReadStoragePermission() {
    return new Promise((resolve, reject) => {
      if (
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE) ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        return resolve();
      }

      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
        .then(result => {
          if (result === PermissionsAndroid.RESULTS.GRANTED) {
            resolve();
          } else {
            reject();
          }
        })
        .catch(err => {
          reject();
          alert(err);
        });
    });
  }

  renderImage = (item) => {
    const { image } = item.item.node;
    const { width: screenWidth } = Dimensions.get('window');
    const width = screenWidth / 4;
    return (
      <TouchableOpacity onPress={() => this.onSelectImage(item)}>
        <Image
          source={{ uri: image.uri }}
          style={[styles.img, { width, height: width }]}
        />
      </TouchableOpacity>
    )
  }

  onSelectImage = (item) => {
    const { image } = item.item.node;
    const { navigate } = this.props.navigation;
    navigate('Photo', { image });
  }

  takePhoto = () => {
    const options = {
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response);
        const source = { uri: response.uri };
        const { navigate } = this.props.navigation;
        navigate('Photo', { image: source });
      }
    });
  }

  storeImages(data) {
    const { edges: photos, page_info: { end_cursor, has_next_page } } = data;
    const { photos: prevData } = this.state;
    var newArray = prevData.slice();    
    newArray.push(...photos);   
    this.setState({
      photos: newArray, 
      photosLoaded: true,
      endCursor: end_cursor,
      hasNextPage: has_next_page,
    })
  };

  onEndReached() {
    if(!this.onEndReachedCalledDuringMomentum){
      this.getPhotos();
      this.onEndReachedCalledDuringMomentum = true;
    }
  }

  render() {
    const { photos, photosLoaded } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <Image
            source={LOGO}
            style={styles.logo}
          />
        </View>
        {!photosLoaded && (
          <ActivityIndicator size="large" />
        )}
        {photosLoaded && (
          <FlatList
            style={styles.photoGrid}
            data={photos}
            renderItem={this.renderImage}
            ListHeaderComponent={() => (
              <View style={styles.headTitle}>
                <Text style={styles.titleText}>LIBRERIA</Text>
              </View>
            )}
            numColumns={4}
            onScroll={this.onScrollHandle}
            keyExtractor={(item) => `${item.node.image.filename}${item.node.timestamp}`}
            onEndReached={this.onEndReached.bind(this)}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            onEndReachedThreshold={0.5}
          />
        )}
        {photosLoaded && (
          <View style={styles.buttons}>
            <View
              style={styles.button}
            >
              <Text style={[styles.buttonText, styles.buttonActive]}>LIBRERIA</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.takePhoto()}
              style={styles.button}
            >
              <Text style={styles.buttonText}>TOMAR FOTO</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: STYLES.color.gray,
    paddingTop: 30,
    flex: 1,
  },
  head: {
    flex: 0,
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomColor: STYLES.color.grayLight,
    borderBottomWidth: 1,
  },
  logo: {
    width: 180,
    height: 124,
  },
  headTitle: {
    padding: 15,
    alignSelf: 'stretch',
  },
  titleText: {
    textAlign: 'center',
    color: STYLES.color.primary,
    fontFamily: STYLES.fonts.montserrat,
    fontSize: 18,  
  },  
  img: {
    borderWidth: 1,
    borderColor: STYLES.color.gray,
  },
  buttons: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: STYLES.color.gray,
    paddingBottom: Platform.OS === 'ios' ? 30 : 0,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  buttonText: {
    color: STYLES.color.text,
    fontFamily: STYLES.fonts.montserrat,
    fontSize: 14,
  },
  buttonActive: {
    color: STYLES.color.primary,
  },
  photoGrid: {
    marginBottom: Platform.OS === 'ios' ? 80 : 0,
  }
});


export default Home;