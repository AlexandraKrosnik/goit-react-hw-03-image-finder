import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';
export const ImageGalleryItem = ({ webformatURL }) => {
  return (
    <GalleryItem>
      <GalleryImg src={webformatURL} alt="" />
    </GalleryItem>
  );
};
