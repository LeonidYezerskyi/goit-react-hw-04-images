import React from 'react';
import PropTypes from "prop-types";

import css from './Modal.module.css';

const Modal = ({ largeImage, onClose }) => {

    return (
        <div className={css.overlay} onClick={onClose}>
            <div className={css.modal}>
                <img src={largeImage} alt="Large" />
            </div>
        </div>
    )
}

Modal.propTypes = {
    largeImage: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default Modal;