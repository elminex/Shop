import React from 'react';
import Proptypes from 'prop-types';
import './Sorting.scss';
import { productTypes } from '../../PropTypes/PropTypes';

const Sorting = ({
  sorting, sortProducts, productsPerPage, changeProductsPerPage, presentPage, filteredProducts,
}) => {
  const sortingHandler = (e) => {
    switch (e.target.value) {
      case 'name asc':
        sortProducts('name', 'asc');
        break;
      case 'price asc':
        sortProducts('price', 'asc');
        break;
      case 'price desc':
        sortProducts('price', 'desc');
        break;
      default:
        sortProducts('popular', 'desc');
    }
  };

  const productsPerPageHandler = (e) => {
    changeProductsPerPage(parseInt(e.target.value, 10));
  };
  return (
    <div className="sorting__container">
      <p className="sorting__text">
        {'Showing '}
        {presentPage === 1 ? 1 : ((presentPage - 1) * productsPerPage) + 1}
        {' - '}
        {presentPage * productsPerPage}
        {' of '}
        {filteredProducts.length}
      </p>
      <div>
        <label className="sorting__label" htmlFor="sort">
          Sort by:
          <select id="sort" value={sorting} onChange={sortingHandler}>
            <option value="name asc">Name</option>
            <option value="price asc">Price ascending</option>
            <option value="price desc">Price descending</option>
            <option value="popular desc">Most popular</option>
          </select>
        </label>
        <label className="sorting__label" htmlFor="productsPerPage">
          Products per page:
          <select id="productsPerPage" value={productsPerPage} onChange={productsPerPageHandler}>
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="36">36</option>
          </select>
        </label>
      </div>
    </div>
  );
};
export default Sorting;

Sorting.propTypes = {
  sorting: Proptypes.string.isRequired,
  sortProducts: Proptypes.func.isRequired,
  productsPerPage: Proptypes.number.isRequired,
  changeProductsPerPage: Proptypes.func.isRequired,
  presentPage: Proptypes.number.isRequired,
  filteredProducts: Proptypes.arrayOf(productTypes).isRequired,
};
