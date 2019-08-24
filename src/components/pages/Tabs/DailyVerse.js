import React from 'react';
import {
  StyleSheet,
	View,
} from 'react-native';
import { get } from 'lodash';
import * as API from '../../../api/';
import Verse from '../../commons/Verse/Verse';
import MainButton from '../../commons/MainButton/MainButton';
import StickerList from '../../commons/StickerList/StickerList';

import { STYLES } from '../../../styles';

class DailyVerse extends React.Component {
	state = {
		activePromises: [],
		verse: null,
	};

	async componentDidMount () {
    const response = await API.getDailyVerse();
    const verse = get(response, 'data.verse.details');
    this.setState({ verse });
  }
  
  render() {
		const { verse } = this.state;
		if (!verse) return null;
		
		const { useVerseHanlder, onSelectSticker } = this.props;
		const reference = get(verse, 'reference');
		const text = get(verse, 'text');

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
						onPressHandler={() => useVerseHanlder(verse)}
					/>
				</View>
        <View style={styles.stickerList}>
          <StickerList onSelectSticker={onSelectSticker} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: STYLES.color.gray,
		flex: 1,
		padding: STYLES.padding.global,
		marginTop: 20,
	},
	useButton: {
    width: '100%',
    marginTop: 20,
  },
  stickerList: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: STYLES.color.grayLight,
  }
});

export default DailyVerse;
