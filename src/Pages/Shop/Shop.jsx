import React from 'react';
import PropTypes from 'prop-types';
import { productTypes, requestTypes } from '../../PropTypes/PropTypes';
import ProductsList from '../ProductsList/ProductsList';
import FilterMenu from '../../components/FilterMenu/FilterMenu';
import Sorting from '../../components/Sorting/Sorting';
import ErrorPage from '../ErrorPage/ErrorPage';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import './Shop.scss';

class Shop extends React.Component {
  constructor() {
    super();
    this.state = {
      sorting: 'popular desc',
      products: [],
      productsPerPage: 12,
      visibleProducts: [],
      pages: 1,
      presentPage: 1,
      filteredProducts: [],
      filter: '',
    };
    this.sortProducts = this.sortProducts.bind(this);
    this.sliceProducts = this.sliceProducts.bind(this);
    this.changePage = this.changePage.bind(this);
    this.changeProductsPerPage = this.changeProductsPerPage.bind(this);
    this.filterHandler = this.filterHandler.bind(this);
  }

  async componentDidMount() {
    const { loadProducts } = this.props;
    await loadProducts();
    const { productsArr, request } = this.props;
    this.setState({ products: productsArr, filteredProducts: productsArr });
    if (request.success) {
      this.sortProducts('popular', 'desc');
      this.sliceProducts(1);
    }
  }

  sortProducts(sort, direction) {
    const { filteredProducts } = this.state;
    let sorted = [];
    if (sort === 'popular') {
      sorted = filteredProducts.sort((a, b) => b.sales - a.sales);
    } else if (direction === 'asc' || !direction) {
      sorted = filteredProducts.sort((a, b) => a[sort].toString().localeCompare(b[sort].toString(),
        { ignorePunctuation: true }));
    } else {
      sorted = filteredProducts.sort((a, b) => b[sort].toString().localeCompare(a[sort].toString(),
        { ignorePunctuation: true }));
    }
    this.changePage(1);
    this.setState({ sorting: `${sort} ${direction}`, filteredProducts: sorted });
  }

  sliceProducts(page) {
    const { filteredProducts, productsPerPage } = this.state;
    const productPages = Math.ceil(filteredProducts.length / productsPerPage);
    const visible = filteredProducts.slice((page - 1) * productsPerPage, page * productsPerPage);
    this.setState({ visibleProducts: visible, pages: productPages });
  }

  changePage(newPage) {
    this.setState({ presentPage: newPage });
    this.sliceProducts(newPage);
  }

  changeProductsPerPage(value) {
    this.setState({ productsPerPage: value }, () => this.changePage(1));
  }

  filterHandler(category, brand) {
    const { products, sorting } = this.state;
    let filtered;
    let filter;
    if (!brand) {
      filtered = products.filter((item) => item.category === category);
      filter = category;
    } else if (!category) {
      filtered = products.filter((item) => item.company === brand);
      filter = brand;
    }
    const splitSorting = sorting.split(' ');
    this.setState({ filteredProducts: filtered, filter }, () => {
      this.sortProducts(splitSorting[0], splitSorting[1]);
      this.changePage(1);
    });
  }

  render() {
    const {
      sorting,
      visibleProducts,
      pages,
      presentPage,
      productsPerPage,
      products,
      filter,
      filteredProducts,
    } = this.state;
    const { request } = this.props;
    let content;
    switch (true) {
      case request.success:
        content = (
          <div className="shop__container">
            <FilterMenu filter={filter} filterHandler={this.filterHandler} products={products} />
            <div className="shop__right-panel">
              <Sorting
                filteredProducts={filteredProducts}
                presentPage={presentPage}
                sorting={sorting}
                sortProducts={this.sortProducts}
                productsPerPage={productsPerPage}
                changeProductsPerPage={this.changeProductsPerPage}
              />
              <ProductsList products={visibleProducts} />
              <Pagination
                pages={pages}
                onPageChange={this.sliceProducts}
                presentPage={presentPage}
                changePage={this.changePage}
              />
            </div>
          </div>
        );
        break;
      case request.error:
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
