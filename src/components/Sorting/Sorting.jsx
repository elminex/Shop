import React from 'react';
import Proptypes from 'prop-types';

const Sorting = ({ sorting, sortProducts }) => {
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

  return (
    <div>
      <span>Sort by:</span>
      <select value={sorting} onChange={sortingHandler}>
        <option value="name asc">Name</option>
        <option value="price asc">Price ascending</option>
        <option value="price desc">Price descending</option>
        <option value="popular desc">Most popular</option>
      </select>
    </div>
  );
};
export default Sorting;

Sorting.propTypes = {
  sorting: Proptypes.string.isRequired,
  sortProducts: Proptypes.func.isRequired,
};
