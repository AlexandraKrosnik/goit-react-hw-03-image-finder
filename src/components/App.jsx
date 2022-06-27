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
    const { images, page, value } = this.state;
    if (prevState.page !== page || prevState.value !== value) {
      this.setState({
        isLoading: true,
        loadMore: false,
      });
      API.fetchImagesByQuery(value.replace(' ', '+'), page)
        .then(({ total, images }) => {
          if (total === 0) {
            this.setState({
              error: `По запиту ${value} світлин не знайдено!`,
              images: [],
            });
          } else {
            this.setState(prevState => ({
              error: false,
              loadMore: !!(prevState.images.length + images.length !== total),
              images: [...prevState.images, ...images],
            }));
          }
        })
        .catch(error => {
          if (!error) {
            this.setState({
              error: 'Щось пішло не так! Перевірте введені дані.',
              loadMore: false,
            });
          }
        })
        .finally(() => {
          this.setState({
            isLoading: false,
          });
        });
    }

    if (images.length !== prevState.images.length) {
      this.scrollSmothly(
        this.setState({
          isLoading: false,
        })
      );
    }
  }

  getDataOnRequest = query => {
    if (query !== this.state.value) {
      this.setState({
        value: query,
        page: 1,
        images: [],
      });
    }
  };

  loadMoreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
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
