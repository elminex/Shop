import React from 'react';
import PropTypes from 'prop-types';
import { productTypes, requestTypes } from '../../../PropTypes/PropTypes';
import ProductsList from '../ProductsList/ProductsList';
import FilterMenu from '../../FilterMenu/FilterMenu';
import Sorting from '../../Sorting/Sorting';
import ErrorPage from '../ErrorPage/ErrorPage';
import Loader from '../../Loader/Loader';
import Pagination from '../../Pagination/Pagination';

class Shop extends React.Component {
  constructor() {
    super();
    this.state = {
      sorting: 'popular',
      products: [],
      productsPerPage: 6,
      visibleProducts: [],
      pages: 1,
      presentPage: 1,
    };
    this.sortProducts = this.sortProducts.bind(this);
    this.sliceProducts = this.sliceProducts.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  async componentDidMount() {
    const { loadProducts } = this.props;
    await loadProducts();
    const { productsArr } = this.props;
    const productPages = Math.ceil(productsArr.length / this.state.productsPerPage);
    this.setState({ products: productsArr, pages: productPages });
    if (this.props.request.success) {
      this.sortProducts('popular', 'desc');
      this.sliceProducts(1);
    }
  }

  sortProducts(sort, direction) {
    const { products } = this.state;
    let sorted = [];
    if (sort === 'popular') {
      sorted = products.sort((a, b) => b.index - a.index);
    } else if (direction === 'asc' || !direction) {
      sorted = products.sort((a, b) => a[sort].toString().localeCompare(b[sort].toString(),
        { ignorePunctuation: true }));
    } else {
      sorted = products.sort((a, b) => b[sort].toString().localeCompare(a[sort].toString(),
        { ignorePunctuation: true }));
    }
    this.changePage(1);
    this.setState({ sorting: `${sort} ${direction}`, products: sorted });
  }

  sliceProducts(page) {
    const { products, productsPerPage } = this.state;
    const visible = products.slice((page - 1) * productsPerPage, page * productsPerPage);
    this.setState({ visibleProducts: visible });
  }

  changePage(newPage) {
    this.setState({ presentPage: newPage });
    this.sliceProducts(newPage);
  }

  render() {
    const {
      sorting,
      visibleProducts,
      pages,
      presentPage,
    } = this.state;
    const { success, error } = this.props.request;
    let content;
    switch (true) {
      case success:
        content = (
          <div>
            <Sorting sorting={sorting} sortProducts={this.sortProducts} />
            <FilterMenu />
            <ProductsList products={visibleProducts} />
            <Pagination
              pages={pages}
              onPageChange={this.sliceProducts}
              show={success}
              presentPage={presentPage}
              changePage={this.changePage}
            />
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
    return (
      <>
        {content}
      </>
    );
  }
}

export default Shop;

Shop.propTypes = {
  loadProducts: PropTypes.func.isRequired,
  productsArr: PropTypes.arrayOf(productTypes).isRequired,
  request: requestTypes.isRequired,
};
