import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { STYLES } from '../../../styles';

const Logotitle = ({
  title,
}) => {
	if (!title) return null;
	
  return (
    <View style={styles.titleWraper}>
      <Text style={styles.titleText}>{title.toUpperCase()}</Text>
    </View>
  );
};

export default Logotitle;

const styles = StyleSheet.create({
  titleWraper: {
		flex: 1,
		justifyContent: 'center',
	},
	titleText: {
		fontSize: 18,
		fontFamily: STYLES.fonts.montserrat,
		color: STYLES.color.primary,
		textAlign: 'center',
	}
});

