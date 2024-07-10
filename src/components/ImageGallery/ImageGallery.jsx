import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ photos, onImageClick }) => {
  return (
    <ul className={css.imageList}>
      {photos.map((photo) => (
        <li className={css.imageItem} key={photo.id}>
          <ImageCard photo={photo} onImageClick={() => onImageClick(photo)} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
