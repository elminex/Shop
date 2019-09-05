import React from 'react';
import Proptypes from 'prop-types';

const Sorting = ({
  sorting, sortProducts, productsPerPage, changeProductsPerPage,
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
    <div>
      <label htmlFor="sort">
        Sort by:
        <select id="sort" value={sorting} onChange={sortingHandler}>
          <option value="name asc">Name</option>
          <option value="price asc">Price ascending</option>
          <option value="price desc">Price descending</option>
          <option value="popular desc">Most popular</option>
        </select>
      </label>
      <label htmlFor="productsPerPage">
        Products per page:
        <select id="productsPerPage" value={productsPerPage} onChange={productsPerPageHandler}>
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="36">36</option>
        </select>
      </label>
    </div>
  );
};
export default Sorting;

Sorting.propTypes = {
  sorting: Proptypes.string.isRequired,
  sortProducts: Proptypes.func.isRequired,
  productsPerPage: Proptypes.number.isRequired,
  changeProductsPerPage: Proptypes.func.isRequired,
};
