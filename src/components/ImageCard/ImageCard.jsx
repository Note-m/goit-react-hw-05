import css from "./ImageCard.module.css";

const ImageCard = ({
  photo: {
    alt_description,
    urls: { small },
  },
  onImageClick,
}) => {
  return (
    <div className={css.wrapperImageCard}>
      <img
        className={css.imageCard}
        onClick={() => onImageClick()}
        src={small}
        alt={alt_description || "Image"}
      />
    </div>
  );
};

export default ImageCard;
