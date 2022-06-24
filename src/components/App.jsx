import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import * as API from '../data/API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    error: '',
    isLoading: false,
    value: '',
    loadMore: false,
  };

  componentDidUpdate(_, prevState) {
    const { images } = this.state;
    if (images.length !== prevState.images.length) {
      this.scrollSmothly();
    }
  }

  takeSearchQuery = async query => {
    const { page, value } = this.state;
    if (value === query) {
      const images = await this.getDataOnRequest(value, page);
      this.setState(prevState => ({
        images: [...prevState.images, images],
      }));
    }
    if (value !== query) {
      const images = await this.getDataOnRequest(query, page);
      this.setState({
        value: query,
        images: [images],
      });
    }
  };

  getDataOnRequest = async query => {
    this.setState({
      error: false,
      isLoading: true,
      loadMore: false,
      page: 1,
      img: [],
    });
    try {
      const { total, images } = await API.fetchImagesByQuery(
        query.replace(' ', '+')
      );

      if (total === 0) {
        this.setState({
          error: `По запиту ${query} світлин не знайдено!`,
          images: [],
        });
        return;
      }
      this.setState({
        value: query,
        images,
        loadMore: !!(total !== images.length),
      });
    } catch (error) {
      this.setState({
        error: 'Щось пішло не так! Перевірте введені дані.',
      });
    } finally {
      this.setState(prevState => ({
        isLoading: false,
        page: prevState.page + 1,
      }));
    }
  };

  loadMoreImages = async () => {
    this.setState({
      error: false,
      isLoading: true,
      loadMore: false,
    });
    const { page, value } = this.state;
    try {
      const { total, images } = await API.fetchImagesByQuery(
        value.replace(' ', '+'),
        page
      );

      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        loadMore: !!(prevState.images.length + images.length !== total),
      }));
    } catch (error) {
      this.setState({
        error: 'Щось пішло не так! Перевірте введені дані.',
      });
    } finally {
      this.setState(prevState => ({
        isLoading: false,
        page: prevState.page + 1,
      }));
    }
  };

  renderBody = () => {
    const { error, images } = this.state;
    if (!!error) {
      return <p>{error}</p>;
    }
    if (!!images) {
      return <ImageGallery images={images} />;
    }
  };

  scrollSmothly = () => {
    window.scrollBy({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.getDataOnRequest} />
        {this.renderBody()}
        {this.state.isLoading && <Loader />}
        {this.state.loadMore && <Button onLoadMore={this.loadMoreImages} />}
      </>
    );
  }
}
