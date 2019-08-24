import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import get from 'lodash/get';

const STICKER1 = require('../../../../assets/images/stickers/1.png');
const STICKER2 = require('../../../../assets/images/stickers/2.png');
const STICKER3 = require('../../../../assets/images/stickers/3.png');
const STICKER4 = require('../../../../assets/images/stickers/4.png');
const STICKER5 = require('../../../../assets/images/stickers/5.png');
const STICKER6 = require('../../../../assets/images/stickers/6.png');
const STICKER7 = require('../../../../assets/images/stickers/7.png');
const STICKER8 = require('../../../../assets/images/stickers/8.png');

const stickers = [
  {
    image: STICKER1,
  },
  {
    image: STICKER2,
  },
  {
    image: STICKER3,
  },
  {
    image: STICKER4,
  },
  {
    image: STICKER5,
  },
  {
    image: STICKER6,
  },
  {
    image: STICKER7,
  },
  {
    image: STICKER8,
  },
];


const StickerList = ({ onSelectSticker }) => {
  renderSticker = ({ item }) => {
    const { width: screenWidth } = Dimensions.get('window');
    const width = (screenWidth / 2) - 40;
    const image = get(item, 'image');
    return (
      <TouchableOpacity
        onPress={() => onSelectSticker(image)}
        style={styles.imgContainer}
      >
        <Image
          source={image}
          style={[styles.img, { width, height: width }]}
        />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        style={styles.stickerGrid}
        data={stickers}
        renderItem={this.renderSticker}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => get(item, 'index').toString()}
      />
		</View>
  );
};

export default StickerList;

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 120,
  },
  imgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  }
});

