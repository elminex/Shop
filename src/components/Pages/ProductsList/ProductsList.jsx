import React from 'react';
import { Link } from 'react-router-dom';

class ProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/')
      .then((res) => res.json())
      .then((res) => {
        this.setState({ items: res });
      });
  }

  render() {
    return (
      <ul>
        {
          this.state.items.map((elem) => (
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
    );
  }
}

export default ProductsList;
