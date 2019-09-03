import React from 'react';
import PropTypes from 'prop-types';
import { productTypes, requestTypes } from '../../../PropTypes/PropTypes';
import Loader from '../../Loader/Loader';
import ProductPreview from '../../ProductPreview/ProductPreview';
import './ProductsList.scss';
import Sorting from '../../Sorting/Sorting';
import ErrorPage from '../ErrorPage/ErrorPage';

class ProductsList extends React.Component {
  constructor() {
    super();
    this.state = {
      sorting: 'popular',
      products: [],
    };
    this.sortProducts = this.sortProducts.bind(this);
  }

  async componentDidMount() {
    const { loadProducts, request } = this.props;
    await loadProducts();
    this.setState({ products: this.props.products });
    if (request.success) {
      this.sortProducts('popular', 'desc');
    }
  }

  sortProducts(sort, direction) {
    const { products } = this.state;
    let sorted = [];
    if (sort === 'popular') {
      sorted = products.sort((a, b) => b.index - a.index);
    } else if (direction === 'asc' || !direction) {
      sorted = products.sort((a, b) => a[sort].localeCompare(b[sort], { ignorePunctuation: true }));
    } else {
      sorted = products.sort((a, b) => b[sort].localeCompare(a[sort], { ignorePunctuation: true }));
    }
    this.setState({ sorting: `${sort} ${direction}`, products: sorted });
  }

  render() {
    const { sorting, products } = this.state;
    const { success, error } = this.props.request;
    let content;
    switch (true) {
      case success:
        content = (
          <div>
            <Sorting sorting={sorting} sortProducts={this.sortProducts} />
            <ul className="products-list__list">
              {
                products.map((elem) => (
                  <li className="products-list__item" key={elem.id}>
                    <ProductPreview elem={elem} />
                  </li>
                ))
              }
            </ul>
          </div>
        );
        break;
      case error:
        content = <ErrorPage />;
        break;
      default:
        content = (
          <div className="products-list__container products-list__container--loader">
            <Loader />
          </div>
        );
    }
    return content;
  }
}

export default ProductsList;

ProductsList.propTypes = {
  loadProducts: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(productTypes).isRequired,
  request: requestTypes.isRequired,
};
