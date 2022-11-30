import React from 'react';
import PropTypes from "prop-types";

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ photos = [], onClick = () => { } }) => {
    return (
        <ul className={css.imageGallery}>
            {photos.map(({ id, webformatURL, largeImageURL }) => {
                return <ImageGalleryItem onClick={onClick} key={id} src={webformatURL} largeImageURL={largeImageURL} id={id} />
            })}
        </ul>
    )
}

ImageGallery.propTypes = {
    photos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClick: PropTypes.func.isRequired
};

export default ImageGallery;