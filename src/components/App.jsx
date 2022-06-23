import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import * as API from '../data/API';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    images: null,
    page: 1,
    error: '',
  };

  takeSearchQuery = async e => {
    e.preventDefault();
    const value = e.target.query.value;
    try {
      const images = await API.fetchImagesByQuery(
        value.trim().replace(' ', '+')
      );

      if (images.length === 0) {
        this.setState({
          error: 'По даному запиту світлин не знайдено!',
          images: [],
        });
        return;
      }
      this.setState({
        images,
      });
    } catch (error) {
      this.setState({
        error: 'Щось пішло не так! Перевірте введені дані.',
      });
    }
  };

  render() {
    const { error, images } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.takeSearchQuery} />
        {!!error && <p>{error}</p>}
        {!!images && <ImageGallery images={images} />}
      </>
    );
  }
}
