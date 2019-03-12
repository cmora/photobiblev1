import React from 'react';
import {
  StyleSheet,
  Text,
	View,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { get } from 'lodash';

import Accordion from 'react-native-collapsible/Accordion';
import { PromisesByTopic } from '../../../data/Promises';
import AcordionHeader from '../../commons/AcordionHeader/AcordionHeader';
import Verse from '../../commons/Verse/Verse';

import { STYLES } from '../../../styles';

class Promises extends React.Component {
	state = {
		activePromises: []
	};

	renderHeader = promise => {
		const { activePromises } = this.state;
		const isExpanded = activePromises[0] === PromisesByTopic.indexOf(promise);
		return (
			<AcordionHeader
				label={promise.name.toUpperCase()}
				isExpanded={isExpanded}
			/>
		);
	};

	renderContent = promise => {
		const { useVerseHanlder } = this.props;
		return (
			<View style={styles.content}>
				{promise.verses.map((verse, index) => {
					const bookName = get(verse, 'book_name');
					const chapter = get(verse, 'chapter');
					const verseNumber = get(verse, 'verse');
					const text = get(verse, 'text');
					const lastItemStyle = {
						borderBottomWidth: (index === promise.verses.length - 1) ? 0 : 1,
						paddingBottom: (index === promise.verses.length - 1) ? 0 : 20,
					}
					return (
						<TouchableOpacity
							style={[styles.verseItem, lastItemStyle]}
							onPress={() => useVerseHanlder(verse) }
							activeOpacity={0.5}
							key={`${verse.book_id}-${chapter}:${verseNumber}`}
						>
							<Verse
								quote={text}
								passage={`${bookName} ${chapter}:${verseNumber}`}
								size="small"
							/>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	};

	updateSections = activePromises => {
		const selectedBook = PromisesByTopic[activePromises[0]];
		this.setState({ activePromises, selectedBook });
	};

  render() {
    return (
      <View style={styles.container}>
				<ScrollView>
					<Accordion
						style={styles.list}
						sections={PromisesByTopic}
						activeSections={this.state.activePromises}
						renderHeader={this.renderHeader}
						renderContent={this.renderContent}
						onChange={this.updateSections}
						touchableProps={{ underlayColor: STYLES.color.grayLight }}
					/>
				</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: STYLES.color.gray,
		flex: 1,
	},
	list: {
		borderTopWidth: 1,
		borderTopColor: STYLES.color.grayLight,
	},
	content: {
		padding: 16,
	},
	verseItem: {
		borderBottomColor: STYLES.color.grayLight,
		marginBottom: 20,
	}
});

export default Promises;
