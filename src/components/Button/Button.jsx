import React from 'react';
import PropTypes from "prop-types";

import css from './Button.module.css';

const Button = ({ onClick }) => {
    return (
        <button onClick={onClick} className={css.loardMoreBtn} type="button">Loard more</button>
    )
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default Button;