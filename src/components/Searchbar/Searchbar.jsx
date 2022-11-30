import React, { useState } from 'react';
import PropTypes from "prop-types";

import css from './Searchbar.module.css'
import search from '../../images/search.svg';

const Searchbar = ({ onSelectName = () => { } }) => {
    const [name, setName] = useState('');

    const onChange = e => {
        const searchName = e.target.value;
        setName(searchName);
    };

    const onSubmit = e => {
        e.preventDefault();
        onSelectName(name);
        reset();
    };

    const reset = () => {
        setName('');
    };

    return (
        <header className={css.searchbar}>
            <form className={css.searchForm} onSubmit={onSubmit}>
                <button type="submit" className={css.searchFormBtn}>
                    <img className={css.iconSearch} src={search} alt='icon' />
                    <span className={css.searchFormBtnLabel}>Search</span>
                </button>

                <input
                    className={css.searchFormInput}
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                    autoComplete="off"
                    autoFocus
                    required
                    placeholder="Search images and photos"
                />
            </form>
        </header>)
}

Searchbar.propTypes = {
    onSelectName: PropTypes.func.isRequired,
};

export default Searchbar;