import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { STYLES } from '../../../styles';

const Button = ({
  label,
  arrow,
  onPressHandler,
  theme
}) => {
  if (!label) return null;

  const color = theme === 'primary' ? STYLES.color.primary : '#FFFFFF';
  const borderColor = color;
	
  return (
    <TouchableOpacity
      style={[styles.button, styles[`button${arrow}`]]}
      onPress={() => onPressHandler ? onPressHandler() : null }
    >
      {arrow && (
        <View style={[styles.arrow, styles[arrow], { borderColor }]} />
      )}
      <Text style={[styles.titleText, { color }]}>{label.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
	},
	titleText: {
		fontSize: 14,
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

