import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { STYLES } from '../../../styles';

const MainButton = ({
  label,
  arrow,
  onPressHandler,
  theme,
  style,
}) => {
  if (!label) return null;

  let color = theme === 'primary' ? STYLES.color.primary : STYLES.color.text;
  let justifyContent = null;
  const borderColor = color;
  const background = style === 'background' ? STYLES.color.primary : null;
  const fontSize = style === 'background' ? 18 : 12;
  const padding = {
    paddingVertical: style === 'background' ? 15 : 10,
    paddingHorizontal: style === 'background' ? 20 : 16,
  };
  if ( style === 'background' ) {
    color = '#FFFFFF';
    justifyContent = 'center';
  }
	
  return (
    <TouchableOpacity
      style={[
        styles.button, 
        styles[`button${arrow}`], 
        { backgroundColor: background, justifyContent }, 
        padding,
      ]}
      onPress={() => onPressHandler ? onPressHandler() : null }
    >
      {arrow && (
        <View style={[styles.arrow, styles[arrow], { borderColor }]} />
      )}
      <Text style={[styles.titleText, { color, fontSize }]}>{label.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
	},
	titleText: {
		fontSize: 12,
		fontFamily: STYLES.fonts.montserrat,
		textAlign: 'center',
  },
  arrow: {
    width: 12,
    height: 12,
    borderWidth: 2,
    transform: [{ rotate: '45deg'}],
  },
  left: {
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  right: {
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  buttonright: {
    flexDirection: 'row-reverse',
  }
});

