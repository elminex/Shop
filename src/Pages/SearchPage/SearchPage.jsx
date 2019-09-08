import React from 'react';
import PropTypes from 'prop-types';
import Search from '../../components/Search/Search';
import ProductsList from '../ProductsList/ProductsList';
import Pagination from '../../components/Pagination/Pagination';
import { productTypes } from '../../PropTypes/PropTypes';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productsPerPage: 12,
      visibleProducts: [],
      pages: 1,
      presentPage: 1,
      searchProducts: [],
    };
    this.sliceProducts = this.sliceProducts.bind(this);
    this.changePage = this.changePage.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
  }

  async componentDidMount() {
    const { loadProducts } = this.props;
    await loadProducts();
    const { productsArr } = this.props;
    this.setState({ products: productsArr });
  }

  searchProducts(text) {
    const { products } = this.state;
    const search = products.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()));
    this.setState({ searchProducts: search }, () => this.sliceProducts(1));
  }

  sliceProducts(page) {
    const { searchProducts, productsPerPage } = this.state;
    const productPages = Math.ceil(searchProducts.length / productsPerPage);
    const visible = searchProducts.slice((page - 1) * productsPerPage, page * productsPerPage);
    this.setState({ visibleProducts: visible, pages: productPages });
  }

  changePage(newPage) {
    this.setState({ presentPage: newPage });
    this.sliceProducts(newPage);
  }

  render() {
    const { visibleProducts, pages, presentPage } = this.state;
    return (
      <div>
        <Search searchProducts={this.searchProducts} />
        <ProductsList products={visibleProducts} />
        {visibleProducts.length === 0 ? '' : (
          <Pagination
            pages={pages}
            onPageChange={this.sliceProducts}
            presentPage={presentPage}
            changePage={this.changePage}
          />
        )}
      </div>
    );
  }
}
export default SearchPage;

SearchPage.propTypes = {
  loadProducts: PropTypes.func.isRequired,
  productsArr: PropTypes.arrayOf(productTypes).isRequired,
};
