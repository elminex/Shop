import React from 'react';
import PropTypes from 'prop-types';
import { productTypes } from '../../PropTypes/PropTypes';
import './FilterMenu.scss';

const FilterMenu = ({ categorySelect, products, category }) => {
  const categoryHandler = (e) => {
    categorySelect(e.currentTarget.value);
  };
  const categories = Array.from(new Set(products.map((item) => item.category)));
  const brands = Array.from(new Set(products.map((item) => item.company)));
  return (
    <div className="filter-menu__container">
      <h3 className="filter-menu__title">Categories</h3>
      <ul className="filter-menu__list">
        {categories.map((item, index) => (
          <li key={index} className="filter-menu__item">
            <button className={category === item ? 'filter-menu__button filter-menu__button--active' : 'filter-menu__button'} type="button" value={item} onClick={categoryHandler}>{item}</button>
          </li>
        ))}
      </ul>
      <h3 className="filter-menu__title">Brand</h3>
      <ul className="filter-menu__list">
        {brands.map((item, index) => (
          <li key={index} className="filter-menu__item">
            <button className={category === item ? 'filter-menu__button filter-menu__button--active' : 'filter-menu__button'} type="button" value={item} onClick={categoryHandler}>{item}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FilterMenu;

FilterMenu.propTypes = {
  categorySelect: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(productTypes.isRequired).isRequired,
  category: PropTypes.string.isRequired,
};
