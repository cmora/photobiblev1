import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  CameraRoll,
  Dimensions,
  ActivityIndicator,
	Platform,
} from 'react-native';
import { isArray } from 'lodash';

import { STYLES } from '../../../../styles/';

const Bar = ({
	items,
}) => {
	if (!isArray(items)) return null;

	return (
		<View style={styles.container}>

		</View>
	);
}

export default Bar;

const styles = StyleSheet.create({
  container: {
		backgroundColor: STYLES.color.gray,
		padding: 16,
	},
});

