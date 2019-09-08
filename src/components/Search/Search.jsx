import React, { useState } from 'react';
import './Search.scss';
import PropTypes from 'prop-types';

const Search = ({ searchProducts }) => {
  const [text, setText] = useState('');
  const setTextHandle = (e) => {
    setText(e.target.value);
    searchProducts(e.target.value);
  };
  return (
    <div className="search__container">
      <label className="search__label" htmlFor="search">
        <input className="search__input" id="search" type="text" value={text} onChange={setTextHandle} placeholder="Search for product" />
      </label>
    </div>
  );
};
export default Search;

Search.propTypes = {
  searchProducts: PropTypes.func.isRequired,
};
