import React from 'react';
import PropTypes from 'prop-types';
import { productTypes } from '../../PropTypes/PropTypes';
import ProductPreview from '../../components/ProductPreview/ProductPreview';
import './ProductsList.scss';


const ProductsList = ({ products }) => (
  <ul className="products-list__list">
    {
      products.length !== 0 ? products.map((elem) => (
        <li className="products-list__item" key={elem.id}>
          <ProductPreview elem={elem} />
        </li>
      )) : (
        <div className="products-list__not-found">
          <h2>No products found</h2>
        </div>
      )
    }
  </ul>
);

export default ProductsList;

ProductsList.propTypes = {
  products: PropTypes.arrayOf(productTypes).isRequired,
};
