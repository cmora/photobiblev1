import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { STYLES } from '../../../styles';

const Verse = ({
	quote,
	passage,
	size,
}) => {
	if (!quote || !passage) return null;

	const quoteStyle = {
		fontSize: size === 'large' ? 20 : 14,
	}
	
	const passageStyle = {
		fontSize: size === 'large' ? 18 : 12,
	}

  return (
    <View style={styles.verseWrapper}>
			<View style={styles.verseHead}>
				<Text style={[styles.verseHeadText, quoteStyle]}>{quote}</Text>
			</View>
			<Text style={[styles.versePassageText, passageStyle]}>{passage}</Text>
		</View>
  );
};

export default Verse;

const styles = StyleSheet.create({
	verseHead: {
		marginBottom: 15,
	},	
	verseHeadText: {
		fontFamily: STYLES.fonts.montserrat,
		color: STYLES.color.text,
	},
	versePassageText: {
		fontFamily: STYLES.fonts.montserratLight,
		color: STYLES.color.primary,
	},
});

