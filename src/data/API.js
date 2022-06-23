import axios from 'axios';
const KEY = '26705827-e07885d0f867327c6c3f35c60';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImagesByQuery = q => {
  return axios
    .get(
      `?q=${q}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(res => {
      return res.data.hits.map(i => ({
        id: i.id,
        webformatURL: i.webformatURL,
        largeImageURL: i.largeImageURL,
      }));
    });
};
