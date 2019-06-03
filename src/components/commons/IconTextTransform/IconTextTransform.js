import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { STYLES } from '../../../styles';

const IconTextTransform = ({
  transform,
  onPressHandler,
}) => {
  if (!transform) return null;

  let toTransform = null;

  if (transform === 'capitalize') {
    toTransform = 'uppercase';
  }
  if (transform === 'uppercase') {
    toTransform = 'lowercase';
  }
  if (transform === 'lowercase') {
    toTransform = 'capitalize';
  }
  
  if (!transform) return null;

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => onPressHandler ? onPressHandler(toTransform) : null }
    >
      <Text style={styles.icon}>
        {transform === 'capitalize' && (
          <Text>Tt</Text>
        )}
        {transform === 'uppercase' && (
          <Text>TT</Text>
        )}
        {transform === 'lowercase' && (
          <Text>tt</Text>
        )}
      </Text>
    </TouchableOpacity>
  );
};

export default IconTextTransform;

const styles = StyleSheet.create({
  button: {
    width: 30,
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    textAlign: 'center',
    color: STYLES.color.text,
    width: '100%',
    fontSize: 18,
  }
});

