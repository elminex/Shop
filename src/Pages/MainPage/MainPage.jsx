import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader/Loader';
import ProductGaleryItem from '../../components/ProductGaleryItem/ProductGaleryItem';
import { productTypes, requestTypes } from '../../PropTypes/PropTypes';
import './MainPage.scss';

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    const { loadProducts, request } = this.props;
    await loadProducts();
    const { products } = this.props;
    this.setState({ products });
    if (request.success) {
      const sorted = products.sort((a, b) => b.sales - a.sales);
      this.setState({ products: sorted });
    }
  }

  render() {
    const { products } = this.state;
    const { request } = this.props;
    let content;
    switch (true) {
      case request.success:
        content = (
          <div className="main-page__container">
            <ul className="main-page__gallery">
              {
                products.map((elem, index) => (index < 10 ? (
                  <li className="main-page__gallery-item" key={elem.id}>
                    <ProductGaleryItem elem={elem} />
                  </li>
                ) : ''))
              }
            </ul>
          </div>
        );
        break;
      case request.error:
        content = <div>An error occured, please try again</div>;
        break;
      default:
        content = <Loader />;
    }
    return content;
  }
}

export default MainPage;

MainPage.propTypes = {
  loadProducts: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(productTypes).isRequired,
  request: requestTypes.isRequired,
};
