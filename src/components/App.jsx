import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    window.addEventListener('keydown', closeModalByEscape);

    return () => {
      window.removeEventListener('keydown', closeModalByEscape);
    };
  }, []);

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
        setPhotos(prevState => [...prevState, ...photoByName]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotoByName(name);
  }, [name, page]);

  const onSelectName = name => {
    setName(name);
    setPhotos([])
    setPage(1)
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