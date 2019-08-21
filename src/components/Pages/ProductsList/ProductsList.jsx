import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { allProductsSelector, loadProductsRequest } from '../../../redux/productsReducer';


class ProductsList extends React.Component {
  constructor() {
    super();
    this.state = {
      sorting: 'popular',
      products: [],
    };
    this.sortingHandler = this.sortingHandler.bind(this);
  }

  async componentDidMount() {
    const { loadProducts } = this.props;
    await loadProducts();
    this.setState({ products: this.props.products });
    console.log('didMount ', this.props);
    this.sortProducts('popular', 'desc');
  }

  sortingHandler(e) {
    switch (e.target.value) {
      case 'name asc':
        this.sortProducts('name', 'asc');
        break;
      case 'price asc':
        this.sortProducts('price', 'asc');
        break;
      case 'price desc':
        this.sortProducts('price', 'desc');
        break;
      default: {
        this.sortProducts('popular', 'desc');
      }
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
    return (
      <div>
        <div>
          <span>Sort by:</span>
          <select value={sorting} onChange={this.sortingHandler}>
            <option value="name asc">Name</option>
            <option value="price asc">Price ascending</option>
            <option value="price desc">Price descending</option>
            <option value="popular">Most popular</option>
          </select>
        </div>
        <ul>
          {
            products.map((elem) => (
              <li key={elem.id}>
                <Link to={`/product/${elem.id}`}>{elem.name}</Link>
                <br />

                <span>{elem.company}</span>
                <br />

                <p>{elem.description}</p>
                <br />

                <span>{elem.price}</span>
                <br />

                <img src={elem.photo} alt={`${elem.name}`} />
                <br />
                <span>{elem.index}</span>
              </li>
            ))
          }
        </ul>
      </div>
    );
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
};

const mapStateToProps = (state) => ({
  products: allProductsSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadProducts: () => dispatch(loadProductsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
