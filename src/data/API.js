import axios from 'axios';
const KEY = '26705827-e07885d0f867327c6c3f35c60';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImagesByQuery = (q, page = 1) => {
  return axios
    .get(
      `?q=${q}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(res => {
      return {
        total: res.data.total,
        images: res.data.hits.map(i => ({
          id: i.id,
          webformatURL: i.webformatURL,
          largeImageURL: i.largeImageURL,
          tags: i.tags,
        })),
      };
    });
};
