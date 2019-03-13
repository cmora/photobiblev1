import React from 'react';
import {
  StyleSheet,
  View,
	Text,
} from 'react-native';

import { STYLES } from '../../../../styles';
import EditorFont from './EditorFont';
import EditorColor from './EditorColor';
import EditorAdjusts from './EditorAdjusts';

const EditorContent = ({
	selectedTab,
	fontSettings,
	colorSettings,
	adjustsSettings,
}) => {
	if (!selectedTab) return null;

	return (
		<View style={styles.container}>
			{/* {renderTab()} */}
			<View style={[
				styles.block,
				selectedTab === 'Fuente' ? styles.active : styles.disable,
			]}>
				<EditorFont {...fontSettings} />
			</View>
			<View style={[
				styles.block,
				selectedTab === 'Color' ? styles.active : styles.disable,
			]}>
				<EditorColor {...colorSettings} />
			</View>
			<View style={[
				styles.block,
				selectedTab === 'Ajustes' ? styles.active : styles.disable,
			]}>
				<EditorAdjusts {...adjustsSettings} />
			</View>
			<View style={[
				styles.block,
				selectedTab === 'Sombra' ? styles.active : styles.disable,
			]}>
				<Text>{selectedTab}</Text>
			</View>
			<View style={[
				styles.block,
				selectedTab === 'Borrar' ? styles.active : styles.disable,
			]}>
				<Text>{selectedTab}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
		backgroundColor: STYLES.color.grayDark,
		height: 100,
		position: 'relative',
		alignItems: 'center',
		flexDirection: 'row',
	},
	block: {
		position: 'absolute',
		height: 100,
		flexDirection: 'column',
		alignItems: 'center',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: STYLES.color.grayDark,
	},	
	disable: {
		zIndex: 1,
	},
	active: {
		zIndex: 2,
	}
});

export default EditorContent;


