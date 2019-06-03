import React from 'react';
import {
  StyleSheet,
  Slider,
  View,
} from 'react-native';

import { STYLES } from '../../../styles/';

const SliderWrapper = ({
  style,
  maximumValue,
  minimumValue,
  step,
  value,
  onValueChange,
}) => {
  return (
    <View style={styles.sliderContainer}>
      <Slider 
        style={style}
        maximumValue={maximumValue}
        minimumValue={minimumValue} 
        step={step} 
        value={value}
        minimumTrackTintColor={STYLES.color.primary}
        maximumTrackTintColor={STYLES.color.grayLight}
        onValueChange={(val) => onValueChange(val)}
      />
    </View>
  );
};

export default SliderWrapper;

const styles = StyleSheet.create({
  sliderContainer: {
    position: 'relative',
    height: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

