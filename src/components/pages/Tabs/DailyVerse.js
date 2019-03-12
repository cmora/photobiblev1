import React from 'react';
import {
  StyleSheet,
	View,
} from 'react-native';
import { get } from 'lodash';
import * as API from '../../../api/';
import Verse from '../../commons/Verse/Verse';
import MainButton from '../../commons/MainButton/MainButton';

import { STYLES } from '../../../styles';

class DailyVerse extends React.Component {
	state = {
		activePromises: [],
		verse: null,
	};

	async componentDidMount () {
		const response = await API.getDailyVerse();
		this.setState({
			verse: response.data.verse,
		});
	}

  render() {
		const { verse } = this.state;
		if (!verse) return null;
		
		const { useVerseHanlder } = this.props;
		const reference = get(verse, 'details.reference');
		const text = get(verse, 'details.text');
		const verseSplit = reference.split(' ');

		const verseData = {
			book_name: verseSplit[0],
			chapter: verseSplit[1].split(':')[0],
			verse: verseSplit[1].split(':')[1],
			text,
		}

    return (
      <View style={styles.container}>
				<Verse
					quote={text}
					passage={reference}
					size="large"
				/>
				<View style={styles.useButton}>
					<MainButton
						label="Usar este versículo"
						theme="primary"
						style="background"
						onPressHandler={() => useVerseHanlder(verseData)}
					/>
				</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: STYLES.color.gray,
		flex: 1,
		padding: 16,
		marginTop: 20,
	},
	useButton: {
		position: 'absolute',
		bottom: 20,
		right: 0,
		left: 0,
		paddingHorizontal: 16,
	},
});

export default DailyVerse;
