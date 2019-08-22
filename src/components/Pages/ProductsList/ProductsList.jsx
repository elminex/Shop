import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { allProductsSelector, loadProductsRequest, getRequest } from '../../../redux/reducer';
import Loader from '../../Loader/Loader';
import ProductPreview from '../../ProductPreview/ProductPreview';
import './ProductsList.scss';
import Sorting from '../../Sorting/Sorting';

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
        content = <div>An error occured, please try again</div>;
        break;
      default:
        content = <Loader />;
    }
    return content;
  }
}

ProductsList.propTypes = {
  loadProducts: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    company: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  })).isRequired,
  request: PropTypes.shape({
    success: PropTypes.oneOfType([
      PropTypes.bool,
      () => null,
    ]),
    pending: PropTypes.oneOfType([
      PropTypes.bool,
      () => null,
    ]),
    error: PropTypes.oneOfType([
      PropTypes.bool,
      () => null,
    ]),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  products: allProductsSelector(state),
  request: getRequest(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadProducts: () => dispatch(loadProductsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
