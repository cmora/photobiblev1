import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const ICON_VERSE = require('../../../../assets/images/icon-verse.png');
const ICON_PASSAGE = require('../../../../assets/images/icon-verse-passage.png');

const IconVerse = ({
  display,
  onPressHandler,
}) => {
  if (!display) return null;

  let ICON = null;
  let toDisplay = null;

  if (display === 'verse') {
    ICON = ICON_VERSE;
    toDisplay = 'passage';
  }
  if (display === 'passage') {
    ICON = ICON_PASSAGE;
    toDisplay = 'verse';
  }
  if (!ICON) return null;

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => onPressHandler ? onPressHandler(toDisplay) : null }
    >
      <Image
				source={ICON}
				style={styles.icon}
			/>
    </TouchableOpacity>
  );
};

export default IconVerse;

const styles = StyleSheet.create({
  button: {
    width: 30,
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 26,
    height: 16,
  }
});

