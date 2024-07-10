import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");
//destructurization array photos
const ImageModal = ({
  onClose,
  customStyles,
  photo: {
    alt_description,
    urls: { regular },
  },
}) => {
  //modal with params and photo with params
  return (
    <Modal
      className={css.modal}
      isOpen={true}
      style={customStyles}
      onRequestClose={onClose}
      overlayClassName={css.overlay}
      contentClassName={css.content}
      contentLabel="Selected Image"
    >
      <img className={css.imgModal} src={regular} alt={alt_description} />
    </Modal>
  );
};

export default ImageModal;
