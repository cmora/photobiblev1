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
import MainButton from '../../commons/MainButton/MainButton';
import Verse from '../../../components/commons/Verse/Verse';

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
		const text = get(verse, 'text').replace('\n', '');

		return (
			<View style={styles.verseWrapper}>
				<Verse
					quote={text}
					passage={`${bookName} ${chapter}:${verseNumber}`}
					size="large"
				/>
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
						<MainButton
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
							<MainButton
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
		padding: STYLES.padding.global,
	},
	versesCarousel: {
		paddingHorizontal: STYLES.padding.global,
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
	useButton: {
		position: 'absolute',
		bottom: 50,
		right: 0,
		left: 0,
		paddingHorizontal: STYLES.padding.global,
	},
	verseWrapper: {
		paddingHorizontal: STYLES.padding.global,
		marginTop: 20,
	}
});

export default BibleModal;
