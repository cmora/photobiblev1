import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const ICON_CENTER = require('../../../../assets/images/icon-align-center.png');
const ICON_LEFT = require('../../../../assets/images/icon-align-left.png');
const ICON_RIGHT = require('../../../../assets/images/icon-align-right.png');

const IconAlign = ({
  align,
  onPressHandler,
}) => {
  if (!align) return null;

  let ICON = null;
  let toAlign = null;

  if (align === 'center') {
    ICON = ICON_CENTER;
    toAlign = 'left';
  }
  if (align === 'left') {
    ICON = ICON_LEFT;
    toAlign = 'right';
  }
  if (align === 'right') {
    ICON = ICON_RIGHT;
    toAlign = 'center';
  }
  if (!ICON) return null;

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => onPressHandler ? onPressHandler(toAlign) : null }
    >
      <Image
				source={ICON}
				style={styles.icon}
			/>
    </TouchableOpacity>
  );
};

export default IconAlign;

const styles = StyleSheet.create({
  button: {
    width: 30,
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 26,
    height: 17,
  }
});

