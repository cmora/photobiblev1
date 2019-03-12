import React from 'react';
import {
  StyleSheet,
  View,
	Text,
} from 'react-native';

import { STYLES } from '../../../../styles';
import EditorFont from './EditorFont'; 

const EditorContent = ({
	selectedTab,
}) => {
	if (!selectedTab) return null;

	const renderTab = () => {
		switch (selectedTab) {
			case 'Fuente':
				return <EditorFont />;
	
			case 'Color':
				return <Text>{selectedTab}</Text>;
	
			case 'Ajustes':
				return <Text>{selectedTab}</Text>;
	
			case 'Sombra':
				return <Text>{selectedTab}</Text>;
	
			case 'Borrar':
				return <Text>{selectedTab}</Text>;
	
			default:
				return null;
		}
	}

	return (
		<View style={styles.container}>
			{renderTab()}
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
		backgroundColor: STYLES.color.garDark,
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
});

export default EditorContent;


