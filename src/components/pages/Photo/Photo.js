import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import Logotitle from '../../commons/Logotitle/Logotitle';
import Button from '../../commons/Button/Button'
import Filter from '../../commons/Filter/Filter';
import { Filters } from '../../../data/Filters';
import { STYLES } from '../../../styles';

class Photo extends React.Component {
  static navigationOptions = (props) => {
    const { navigate, getParam} = props.navigation;
    const filter = getParam('filter');
    const image = getParam('image');
    return {
      headerTitle: <Logotitle title="PHOTOBIBLE" />,
      headerRight: (
        <Button
          onPressHandler={() => navigate('Tabs', { filter, image })}
          arrow="right"
          label="Siguiente"
          theme="primary"
          style="clear"
        />
      ),
    }
  }

  state = {
    imageLoaded: false,
    filtersLoaded: false,
    filter: 'Original',
    image: null,
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { filter } = this.state;
    const image = navigation.getParam('image');
    navigation.setParams({ filter });
    this.setState({ image, filtersLoaded: true, imageLoaded: true });
  }

  setFilter = (filter) => {
    this.setState({ filter });
    const { navigation } = this.props;
    navigation.setParams({ filter });
  }

  renderImage = () => {
    const { image, filter, imageLoaded } = this.state;
    const { width } = Dimensions.get('window');
    if (!imageLoaded) return <ActivityIndicator size="large" />;

    return (
      <View style={styles.image}>
        <Filter name={filter}>
          <Image
            source={{ uri: image.uri }}
            style={{ width, height: width }}
          />
        </Filter>
      </View>
    );
  }

  renderFilterItem = (filter) => {
    const { image, filter: filterName } = this.state;
    const { name } = filter.item;
    return (
      <TouchableOpacity
        style={styles.filterCard}
        onPress={() => this.setFilter(name)}
      >
        <Text style={[styles.filterCardTitle, filterName === name ? styles.filterActiveText : null]}>
          {name.toUpperCase()}
        </Text>
        <View style={styles.filterCardImage}>
          <Filter name={name}>
            <Image
              source={{ uri: image.uri }}
              style={[styles.filterImg, filterName === name ? styles.filterActive : null]}
            />
          </Filter>
        </View>
      </TouchableOpacity>
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
              data={Filters}
              renderItem={this.renderFilterItem}
              keyExtractor={(item) => item.id.toString()}
              extraData={this.state}
              horizontal
            />
          </View>
        )}
        {!filtersLoaded && (
          <ActivityIndicator size="small" />
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
  image: {
    marginBottom: 20,
  },
  filterCard: {
    borderRadius: 10,
    paddingHorizontal: 5,
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
  },
  filterImg: {
    width: 98,
    height: 98,
    borderWidth: 1,
    borderColor: STYLES.color.gray,
  },
  filterActive: {
    borderWidth: 1,
    borderColor: STYLES.color.primary,
  },
  filterActiveText: {
    color: STYLES.color.primary,
  }
});

export default Photo;
