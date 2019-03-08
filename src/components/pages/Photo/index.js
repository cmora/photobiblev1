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
  Button
} from 'react-native';

import {
  Grayscale,
  Sepia,
  Tint,
  ColorMatrix,
  concatColorMatrices,
  invert,
  contrast,
  saturate,
  Vintage
} from 'react-native-color-matrix-image-filters';

import Logotitle from '../../commons/Logotitle/';
import { STYLES } from '../../../styles';

class Photo extends React.Component {
  static navigationOptions = (props) => {
    return {
      headerTitle: <Logotitle title="PHOTOBIBLE" />,
      headerBackTitle: 'Volver',
    }
  }

  state = {
    filtersLoaded: true,
    image: null,
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { item } = navigation.getParam('image');
    const { node: { image } } = item;
    this.setState({ image });
  }

  renderImage = () => {
    const { image } = this.state;
    const { width } = Dimensions.get('window');
    return (
      <View style={styles.image}>
        <Image
          source={{ uri: image.uri }}
          style={{ width, height: width }}
        />
      </View>
    );
  }

  renderFilterItem = (item, index) => {
    const { image } = this.state;
    return (
      <View style={styles.filterCard}>
        <Text style={styles.filterCardTitle}>NORMAL</Text>
        <View style={styles.filterCardImage}>
        <Vintage>
          <Image
            source={{ uri: image.uri }}
            style={{ width: 100, height: 100 }}
          />
        </Vintage>
        </View>
      </View>
    )
  }

  render() {
    const { filtersLoaded, image } = this.state;
    if (!image) return null;

    return (
      <View style={styles.container}>
        {this.renderImage()}
        {filtersLoaded && (
          <View
            style={styles.filterCarousel}
          >
            <FlatList
              data={[{key: 'a'}, {key: 'b'},{key: 'a'}, {key: 'b'},{key: 'a'}, {key: 'b'},{key: 'a'}, {key: 'b'},{key: 'a'}, {key: 'b'}]}
              renderItem={this.renderFilterItem}
              horizontal
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
    flexDirection: 'column',
    justifyContent: 'center',
  },
  filterCarousel: {
    marginTop: 20,
  },
  filterCard: {
    borderRadius: 10,
    paddingHorizontal: 5,
    height: 100,
  },
  filterCardTitle: {
    fontFamily: STYLES.fonts.montserrat,
    fontSize: 10,
    marginBottom: 5,
    textAlign: 'center',
    color: '#fff',
  },
  filterCardImage: {
    width: 100,
    height: 100
  }
});

export default Photo;
