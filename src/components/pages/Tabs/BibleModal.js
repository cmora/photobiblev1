import React from 'react';
import {
  StyleSheet,
  Text,
	View,
	ScrollView,
  Modal,
	TouchableOpacity,
	FlatList,
} from 'react-native';

import { isArray, get } from 'lodash';
import Button from '../../../components/commons/Button/Button';
import * as API from '../../../api/';

import { Books } from '../../../data/Books';

import { STYLES } from '../../../styles';

class BibleModal extends React.Component {

	renderVerseItem = (verse) => {
		const { setVerse } = this.props;
		return (
			<View
			style={styles.verseItem}
			>
				<TouchableOpacity
					style={styles.verse}
					onPress={() => setVerse(verse.item)}
				>
					<Text style={styles.verseText}>{verse.item.verse}</Text>
				</TouchableOpacity>

			</View>
		);
	}

	renderVerse() {
		const { verse } = this.props;
		const bookName = get(verse, 'book_name');
		const chapter = get(verse, 'chapter');
		const verseNumber = get(verse, 'verse');
		const text = get(verse, 'text');

		return (
			<View style={styles.verseWrapper}>
				<View style={styles.verseHead}>
					<Text style={styles.verseHeadText}>{text}</Text>
				</View>
				<Text style={styles.verseChapterText}>{bookName} {chapter}:{verseNumber}</Text>
			</View>
		)
	}

  render() {
		const {
			modalVisible,
			selectedChapter,
			selectedBook,
			verses,
			onCloseModal,
			verse,
			useVerseHanlder,
		} = this.props;

    return (
      <Modal
				animationType="slide"
				transparent={false}
				visible={modalVisible}
			>
				<View style={styles.modal}>
					<View style={styles.modalHeader}>
						<Button
							onPressHandler={() => {
								onCloseModal();
							}}
							label="Cancelar"
							theme="primary"
							style="clear"
						/>
					</View>
					{selectedChapter > 0 && (
						<View style={styles.modalContent}>
							<Text style={styles.modalTitle}>{ selectedBook.name.toUpperCase() } { selectedChapter }</Text>
						</View>
					)}
					{isArray(verses) && verses.length > 0 && (
						<View
							style={styles.versesCarousel}
						>
							<FlatList
								data={verses}
								renderItem={this.renderVerseItem}
								keyExtractor={(item) => `${item.book_id}-${item.chapter}:${item.verse}`}
								horizontal
							/>
						</View>
					)}
					{verse && this.renderVerse()}
					{verse && (
						<View style={styles.useButton}>
							<Button
								label="Usar este versículo"
								theme="primary"
								style="background"
								onPressHandler={() => useVerseHanlder(verse)}
							/>
						</View>
					)}
				</View>
			</Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
		flex: 1,
		backgroundColor: STYLES.color.gray,
		paddingTop: 40,
	},
	modalTitle: {
		fontSize: 20,
		fontFamily: STYLES.fonts.montserratBlack,
		color: STYLES.color.primary,
	},
	modalContent: {
		padding: 16,
	},
	versesCarousel: {
		paddingHorizontal: 16,
	},
	verseItem: {
		marginHorizontal: 5,
	},
	verse: {
		width: 60,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: STYLES.color.text,
	},
	verseText: {
		color: STYLES.color.text,
		fontSize: 12,
		fontFamily: STYLES.fonts.montserrat,
	},
	verseWrapper: {
		paddingHorizontal: 16,
		marginTop: 24, 
	},
	verseHeadText: {
		fontSize: 20,
		fontFamily: STYLES.fonts.montserrat,
		color: STYLES.color.text,
	},
	verseChapterText: {
		fontSize: 18,
		fontFamily: STYLES.fonts.montserratLight,
		color: STYLES.color.primary,
	},
	useButton: {
		position: 'absolute',
		bottom: 50,
		right: 0,
		left: 0,
		paddingHorizontal: 16,
	}
});

export default BibleModal;
