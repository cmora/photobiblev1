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

import { STYLES } from '../../../styles';

const LOGO = require('../../../../assets/images/logo.png');

class Home extends React.Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    photosLoaded: false,
    photos: [],
    index: null
  }

  componentDidMount() {
    this.getPhotos();
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 100,
      assetType: 'Photos',
      groupTypes: 'All',
    })
    .then(r => this.setState({ photos: r.edges, photosLoaded: true }))
    .catch((err) => {
      console.log(err);
    });
  }

  renderImage = (item) => {
    const { image } = item.item.node;
    const { width: screenWidth } = Dimensions.get('window');
    const width = screenWidth / 4;
    console.log(item);
    return (
      <TouchableOpacity onPress={() => this.onSelectImage(item)}>
        <Image
          source={{ uri: image.uri }}
          style={[styles.img, { width, height: width }]}
        />
      </TouchableOpacity>
    )
  }

  onSelectImage = (image) => {
    const { navigate } = this.props.navigation;
    navigate('Photo', { image });
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
          <View style={styles.headTitle}>
            <Text style={styles.titleText}>PHOTOBIBLE</Text>
          </View>
        </View>
        {!photosLoaded && (
          <ActivityIndicator size="large" />
        )}
        {photosLoaded && (
          <FlatList
            data={photos}
            renderItem={this.renderImage}
            numColumns={4}
            onScroll={this.onScrollHandle}
            keyExtractor={(item) => item.node.image.filename}
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
              onPress={() => this.onSelectImage(item)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>PHOTO</Text>
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
  },
  logo: {
    width: 180,
    height: 124,
  },
  headTitle: {
    padding: 15,
    marginTop: 20,
    borderTopColor: STYLES.color.grayLight,
    borderTopWidth: 1,
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
    color: '#fff',
    fontFamily: STYLES.fonts.montserrat,
    fontSize: 14,
  },
  buttonActive: {
    color: STYLES.color.primary,
  }
});


export default Home;