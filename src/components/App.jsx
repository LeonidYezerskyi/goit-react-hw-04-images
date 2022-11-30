import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { getPhotoByName } from '../services/Api';
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";

const App = () => {

  const [name, setName] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');


  static defaultProps = {
  photos: [],
};

  static propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

useEffect(() => { window.addEventListener('keydown', closeModalByEscape); }, []);

const closeModalByEscape = (event) => {
  if (event.code === 'Escape') {
    setLargeImage('');
  }
};

useEffect(() => {
  if (!name.length) return;

  const fetchPhotoByName = async name => {
    try {
      setIsLoading(true);
      const photoByName = await getPhotoByName(name, page);
      setPhotos(prevState => [...prevState.photos, ...photoByName]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  fetchPhotoByName(name);
}, [name, page]);

useEffect(() => {
  window.removeEventListener('keydown', closeModalByEscape);
}, [])

const onSelectName = name => {
  this.setState({ name: name, photos: [], page: 1 });
};

const onClickBtn = () => {
  setPage(page + 1);
}

const onClickImage = (src) => {
  setLargeImage(src)
}

const onCloseModal = () => {
  setLargeImage('')
}

return (
  <div
    style={{

      display: 'grid',
      gridTemplateColumns: '1fr',
      gridGap: 16,
      paddingBottom: 24,
    }}>
    <Searchbar onSelectName={onSelectName} />
    {error.length > 0 && (
      <p>
        Upss, Some error occured... {error}
      </p>
    )}
    {isLoading && <Loader />}
    <ImageGallery photos={photos} onClick={onClickImage} />
    {photos.length > 0 && <Button onClick={onClickBtn} />}
    {!!largeImage.length && <Modal onClose={onCloseModal} largeImage={largeImage} />}
  </div>
);
};

export { App };