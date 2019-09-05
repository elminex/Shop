import React from 'react';
import PropTypes from 'prop-types';
import { productTypes, requestTypes } from '../../../PropTypes/PropTypes';
import ProductsList from '../ProductsList/ProductsList';
import FilterMenu from '../../FilterMenu/FilterMenu';
import Sorting from '../../Sorting/Sorting';
import ErrorPage from '../ErrorPage/ErrorPage';
import Loader from '../../Loader/Loader';
import Pagination from '../../Pagination/Pagination';
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
      category: '',
    };
    this.sortProducts = this.sortProducts.bind(this);
    this.sliceProducts = this.sliceProducts.bind(this);
    this.changePage = this.changePage.bind(this);
    this.changeProductsPerPage = this.changeProductsPerPage.bind(this);
    this.categorySelect = this.categorySelect.bind(this);
  }

  async componentDidMount() {
    const { loadProducts } = this.props;
    await loadProducts();
    const { productsArr } = this.props;
    this.setState({ products: productsArr, filteredProducts: productsArr });
    if (this.props.request.success) {
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

  categorySelect(category) {
    const { products, sorting } = this.state;
    const filtered = products.filter((item) => item.category === category);
    const splitSorting = sorting.split(' ');
    this.setState({ filteredProducts: filtered, category }, () => {
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
      category,
    } = this.state;
    const { success, error } = this.props.request;
    let content;
    switch (true) {
      case success:
        content = (
          <div className="shop__container">
            <Sorting
              sorting={sorting}
              sortProducts={this.sortProducts}
              productsPerPage={productsPerPage}
              changeProductsPerPage={this.changeProductsPerPage}
            />
            <div className="shop__utilities">
              <FilterMenu category={category} categorySelect={this.categorySelect} products={products} />
              <ProductsList products={visibleProducts} />
            </div>
            <Pagination
              pages={pages}
              onPageChange={this.sliceProducts}
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
