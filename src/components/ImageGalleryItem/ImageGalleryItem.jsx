import React from 'react';
import PropTypes from "prop-types";

import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, onClick, largeImageURL }) => {
    return (
        <li className={css.imageGalleryItem} >
            <img className={css.imageGalleryItemImage} onClick={() => onClick(largeImageURL)} src={src} alt="search word" />
        </li>
    )
}
ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
}

export default ImageGalleryItem;