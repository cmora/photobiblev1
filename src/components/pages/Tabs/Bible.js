import React from 'react';
import {
  StyleSheet,
  Text,
	View,
	ScrollView,
	TouchableOpacity,
} from 'react-native';

import Accordion from 'react-native-collapsible/Accordion';
import AcordionHeader from '../../commons/AcordionHeader/AcordionHeader';
import BibleModal from '../../pages/Tabs/BibleModal';
import * as API from '../../../api/';

import { Books } from '../../../data/Books';

import { STYLES } from '../../../styles';

class Bible extends React.Component {
	state = {
		modalVisible: false,
		selectedBook: null,
		activeBooks: [],
		selectedChapter: 0,
		verses: [],
		selectedVerse: null,
	};

	setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  renderHeader = book => {
		const { activeBooks } = this.state;
		const isExpanded = activeBooks[0] === Books.indexOf(book);
    return (
      <AcordionHeader
				label={book.name.toUpperCase()}
				isExpanded={isExpanded}
			/>
    );
	};
	
	renderChapters = number => {
		const chapters = [];
		for (i = 0; i < number; i++) {
			const number = i + 1;
			chapters.push(
				<TouchableOpacity
					style={styles.chapterItem}
					onPress={() => this.selectChapter(number)}
					key={i}
				>
					<Text style={styles.chapterItemText}>{number}</Text>
				</TouchableOpacity>
			);
		}
		return <View style={styles.chapters}>{chapters}</View>;
	}

	selectChapter = async (chapter) => {
		const { selectedBook: { name } } = this.state;
		this.setModalVisible(!this.state.modalVisible);
		const response = await API.getVerses(name, chapter);
		const { verses } = response.data;
		this.setState({ selectedChapter: chapter, verses });
	}
 
  renderContent = book => {
		const { activeBooks } = this.state;
		const isExpanded = activeBooks[0] === Books.indexOf(book);
		if (!isExpanded) return null;
    return (
      <View style={styles.content}>
				{this.renderChapters(book.chapters)}
      </View>
    );
  };
 
  updateSections = activeBooks => {
		const selectedBook = Books[activeBooks[0]];
    this.setState({ activeBooks, selectedBook });
	};
	
	setVerse = (verse) => {
		this.setState({ selectedVerse: verse });
	}

	onCloseModal = () => {
		this.setModalVisible(!this.state.modalVisible);
		this.setState({
			selectedBook: null,
			activeBooks: [],
			selectedChapter: 0,
			verses: [],
			selectedVerse: null,
		});
	}

	useVerseHanlder = () => {
		const { useVerseHanlder } = this.props;
		this.setModalVisible(!this.state.modalVisible);
		setTimeout(() => {
			useVerseHanlder(this.state.selectedVerse);
		}, 500);
	}

  render() {
		const {
			modalVisible,
			selectedChapter,
			selectedBook,
			verses,
			selectedVerse,
		} = this.state;

    return (
      <View style={styles.container}>
				<ScrollView>
					<Accordion
						sections={Books}
						activeSections={this.state.activeBooks}
						renderHeader={this.renderHeader}
						renderContent={this.renderContent}
						onChange={this.updateSections}
						touchableProps={{ underlayColor: STYLES.color.grayLight }}
					/>
				</ScrollView>
				{selectedBook && (
					<BibleModal
						onCloseModal={this.onCloseModal}
						modalVisible={modalVisible}
						selectedChapter={selectedChapter}
						selectedBook={selectedBook}
						verses={verses}
						setVerse={this.setVerse}
						verse={selectedVerse}
						useVerseHanlder={this.useVerseHanlder}
					/>
				)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: STYLES.color.gray,
		flex: 1,
	},
	content: {
		paddingHorizontal: 16,
		marginBottom: 16,
	},
	chapters: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: "wrap",
		marginRight: -16,
	},
	chapterItem: {
		width: 60,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: STYLES.color.text,
		marginBottom: 10,
		marginRight: 10,
	},
	chapterItemText: {
		color: STYLES.color.text,
		fontSize: 12,
		fontFamily: STYLES.fonts.montserrat,
	},
});

export default Bible;
