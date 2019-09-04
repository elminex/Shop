import React from 'react';
import PropTypes from 'prop-types';
import { productTypes } from '../../../PropTypes/PropTypes';
import ProductPreview from '../../ProductPreview/ProductPreview';
import './ProductsList.scss';


const ProductsList = ({ products }) => (
  <ul className="products-list__list">
    {
      products.map((elem) => (
        <li className="products-list__item" key={elem.id}>
          <ProductPreview elem={elem} />
        </li>
      ))
    }
  </ul>
);

export default ProductsList;

ProductsList.propTypes = {
  products: PropTypes.arrayOf(productTypes).isRequired,
};
