import PropTypes from 'prop-types';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    isModal: false,
  };
  toggleModal = () => {
    this.setState(({ isModal }) => ({
      isModal: !isModal,
    }));
  };
  render() {
    const { webformatURL, largeImageURL, tags } = this.props.data;
    const { isModal } = this.state;

    return (
      <GalleryItem>
        <GalleryImg src={webformatURL} alt={tags} onClick={this.toggleModal} />
        {isModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
