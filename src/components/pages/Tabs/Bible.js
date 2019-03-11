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

import Accordion from 'react-native-collapsible/Accordion';
import { isArray } from 'lodash';
import Button from '../../../components/commons/Button/Button';
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
      <View style={styles.header}>
        <Text style={styles.headerText}>{book.name.toUpperCase()}</Text>
				<View style={[styles.arrow, isExpanded ? styles.arrowExpanded : null]} />
      </View>
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

  render() {
		const {
			modalVisible,
			selectedChapter,
			selectedBook,
			verses,
			selectedVerse,
		} = this.state;

		const { useVerseHanlder } = this.props;

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
						useVerseHanlder={useVerseHanlder}
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
