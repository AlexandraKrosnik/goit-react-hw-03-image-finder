import { ImageList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
export const ImageGallery = ({ images }) => {
  console.log(images);
  return (
    <ImageList>
      {images.map(i => (
        <ImageGalleryItem
          key={i.id}
          webformatURL={i.webformatURL}
        ></ImageGalleryItem>
      ))}
    </ImageList>
  );
};
