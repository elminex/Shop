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
    console.log('render ', this.props);
  }

  sortingHandler(e) {
    console.log(e.target.value);
    switch (e.target.value) {
      case 'name asc':
        console.log("case name")
        this.sort('name', 'asc');
        break;
      case 'price asc':
        this.sort('price', 'asc');
        break;
      case 'price desc':
        this.sort('price', 'desc');
        break;
      default: {
        this.sort('index', 'desc');
      }
    }
  }

  sort(sort, direction) {
    debugger;
    console.log(sort, direction);
    let sorted = [];
    if(sort === index) {
      sorted = this.state.products.sort()
    }
    if (direction === 'asc' || !direction) {
      sorted = this.state.products.sort((a, b) => a[sort].localeCompare(b[sort], { ignorePunctuation: true }));
    } else {
      sorted = this.state.products.sort((a, b) => b[sort].localeCompare(a[sort], { ignorePunctuation: true }));
      console.log(sorted)
    }
    this.setState({ sorting: sort === 'index' ? 'popular' : `${sort} ${direction}`, products: sorted });
  }

  render() {
    const { sorting, products } = this.state;
    console.log('products ', products);
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
                <span>{elem.company}</span>
                <p>{elem.description}</p>
                <span>{elem.price}</span>
                <img src={elem.photo} alt={`${elem.name}`} />
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
