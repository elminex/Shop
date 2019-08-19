import React from 'react';
import { Link } from 'react-router-dom';

const ProductsList = () => (
  <ul>
    <li>
      <Link to="/product/item1">Item1</Link>
    </li>
    <li>
      <Link to="/product/item2">Item2</Link>
    </li>
    <li>
      <Link to="/product/item3">Item3</Link>
    </li>
  </ul>
);
export default ProductsList;
