const API_KEY = 'wFNxrD2HpjJ8Q9iUKpqAqfNq1tkM6LbtsC5HxJBv';

import axios from 'axios';

export const getVerses = async (id, chapter) => {
	try {
    return await axios.get(`https://es.bibles.org/v2/chapters/${id}.${chapter}/verses.js`, {
      auth: {
        username: API_KEY,
      }
    });
  } catch (error) {
    console.error(error)
  }
};

export const getBooks = async () => {
	try {
    return await axios.get('https://es.bibles.org/v2/versions/spa-RVR1960/books.js', {
      params: { include_chapters: true },
      auth: {
        username: API_KEY,
      },
    });
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