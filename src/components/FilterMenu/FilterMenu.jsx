import React from 'react';
import PropTypes from 'prop-types';
import { productTypes } from '../../PropTypes/PropTypes';
import './FilterMenu.scss';

const FilterMenu = ({ filterHandler, filter, products }) => {
  const categoryHandler = (e) => {
    filterHandler(e.currentTarget.value, undefined);
  };
  const brandHandler = (e) => {
    filterHandler(undefined, e.currentTarget.value);
  };
  const categories = Array.from(new Set(products.map((item) => item.category)));
  const brands = Array.from(new Set(products.map((item) => item.company)));
  return (
    <div className="filter-menu__container">
      <h2 className="filter-menu__title">Categories</h2>
      <ul className="filter-menu__list">
        {categories.map((item, index) => (
          <li key={index} className="filter-menu__item">
            <button className={filter === item ? 'filter-menu__button filter-menu__button--active' : 'filter-menu__button'} type="button" value={item} onClick={categoryHandler}>{item}</button>
          </li>
        ))}
      </ul>
      <h2 className="filter-menu__title">Brand</h2>
      <ul className="filter-menu__list">
        {brands.map((item, index) => (
          <li key={index} className="filter-menu__item">
            <button className={filter === item ? 'filter-menu__button filter-menu__button--active' : 'filter-menu__button'} type="button" value={item} onClick={brandHandler}>{item}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FilterMenu;

FilterMenu.propTypes = {
  filterHandler: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(productTypes.isRequired).isRequired,
  filter: PropTypes.string.isRequired,
};
