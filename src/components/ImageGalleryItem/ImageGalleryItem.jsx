import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  item: { largeImageURL, tags, webformatURL },
}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <>
      {showModal && (
        <Modal onClose={toggleModal} image={largeImageURL} tag={tags} />
      )}

      <li onClick={toggleModal} className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
        />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};