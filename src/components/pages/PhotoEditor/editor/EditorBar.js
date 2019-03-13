import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import { isArray } from 'lodash';

import { STYLES } from '../../../../styles';

const BarButton = ({
	label,
	icon,
	iconActive,
	isSelected,
	onChangeButton,
	width,
}) => {
	const ICON = isSelected ? iconActive : icon; 
	const color = isSelected ? STYLES.color.primary : STYLES.color.text;
	return (
		<TouchableOpacity
			style={[styles.button, { width }]}
			onPress={() => onChangeButton ? onChangeButton(label) : null }
		>
			<Image
				source={ICON}
				style={styles.icon}
			/>
			<Text style={[styles.label, { color }]}>{label.toUpperCase()}</Text>
		</TouchableOpacity>
	);
}

const EditorBar = ({
	options,
	onChangeButton,
}) => {
	if (!isArray(options)) return null;

	const itemWidth = Dimensions.get('window').width / options.length;

	return (
		<View style={styles.container}>
			{options.map((option) => {
				return (
					<BarButton
						label={option.name}
						icon={option.icon}
						iconActive={option.iconActive}
						isSelected={option.isSelected}
						onChangeButton={onChangeButton}
						key={option.name}
						width={itemWidth}
					/>
				);
			})}
		</View>
	);
}

export default EditorBar;

const styles = StyleSheet.create({
  container: {
		backgroundColor: STYLES.color.grayDark,
		paddingTop: 6,
		paddingBottom: 12,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingBottom: 20,
	},
	button: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		width: 35,
		height: 35,
		marginBottom: 5,
	},
	label: {
		fontSize: 10,
		color: STYLES.color.text,
		fontFamily: STYLES.fonts.montserrat,
	}
});

