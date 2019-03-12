import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { STYLES } from '../../../styles';

const AcordionHeader = ({
	label,
	isExpanded,
}) => {
	if (!label) return null;
	
  return (
    <View style={styles.header}>
			<Text style={styles.headerText}>{label}</Text>
			<View style={[styles.arrow, isExpanded ? styles.arrowExpanded : null]} />
		</View>
  );
};

export default AcordionHeader;

const styles = StyleSheet.create({
  header: {
		paddingVertical: 14,
		paddingHorizontal: 16,
		borderTopWidth: 1,
		borderTopColor: STYLES.color.grayLight,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	headerText: {
		color: STYLES.color.text,
		fontFamily: STYLES.fonts.montserrat,
		fontSize: 14,
	},
	arrow: {
    width: 10,
    height: 10,
    borderWidth: 1,
		transform: [{ rotate: '45deg'}],
		borderColor: STYLES.color.text,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		marginTop: -2,
	},
	arrowExpanded: {
		transform: [{ rotate: '-135deg'}],
		marginTop: 4,
	},
});

