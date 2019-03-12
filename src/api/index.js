import axios from 'axios';

export const getVerses = async (book, chapter) => {
	try {
    return await axios.get(`http://bible-api.com/${book}${chapter}`, { params: { verse_numbers: true }});
  } catch (error) {
    console.error(error)
  }
};

export const getDailyVerse = async () => {
	try {
    return await axios.get('https://beta.ourmanna.com/api/v1/get/', { params: { format: 'json' }});
  } catch (error) {
    console.error(error)
  }
};