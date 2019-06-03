import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const ICON_TEXT_SHADOW = require('../../../../assets/images/icon-text-shadow.png');
const iCON_SHADOW_BOX = require('../../../../assets/images/icon-shadow-box.png');

const IconShadow = ({
  display,
  onPressHandler,
}) => {
  if (!display) return null;

  let ICON = null;
  let toDisplay = null;

  if (display === 'text') {
    ICON = ICON_TEXT_SHADOW;
    toDisplay = 'box';
  }
  if (display === 'box') {
    ICON = iCON_SHADOW_BOX;
    toDisplay = 'text';
  }
  if (!ICON) return null;

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => onPressHandler ? onPressHandler(toDisplay) : null }
    >
      <Image
				source={ICON}
				style={[
          display === 'text' ? styles.iconText : styles.iconBox,
        ]}
			/>
    </TouchableOpacity>
  );
};

export default IconShadow;

const styles = StyleSheet.create({
  button: {
    width: 30,
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    width: 20,
    height: 20,
  },
  iconBox: {
    width: 25,
    height: 20,    
  }
});

