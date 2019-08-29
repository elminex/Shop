import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../Loader/Loader';
import ProductGaleryItem from '../../ProductGaleryItem/ProductGaleryItem';
import { productTypes, requestTypes } from '../../../PropTypes/PropTypes';
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
    this.setState({ products: this.props.products });
    if (request.success) {
      const sorted = this.state.products.sort((a, b) => b.sales - a.sales);
      this.setState({ products: sorted });
    }
  }

  render() {
    const { products } = this.state;
    const { success, error } = this.props.request;
    let content;
    switch (true) {
      case success:
        content = (
          <div>
            <ul className="main-page__gallery">
              {
                products.map((elem) => (
                  <li className="main-page__gallery-item" key={elem.id}>
                    <ProductGaleryItem elem={elem} />
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

export default MainPage;

MainPage.propTypes = {
  loadProducts: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(productTypes).isRequired,
  request: requestTypes.isRequired,
};
