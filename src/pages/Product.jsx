import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

export default class Product extends Component {
  state = {
    product: {},
  };

  componentDidMount() {
    this.handleProduct();
  }

  handleProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getProductById(id);
    this.setState({
      product: {
        name: response.title,
        image: response.pictures[0].url,
        price: response.price,
      },
    });
  };

  render() {
    const { product: { name, image, price } } = this.state;
    return (
      <div>
        <h1 data-testid="product-detail-name">
          { name }
        </h1>
        <p data-testid="product-detail-price">
          { `Preço: R$${price}` }
        </p>
        <div>
          <img src={ image } alt={ name } data-testid="product-detail-image" />
        </div>
        <Link
          to="/Cart"
        >
          <button data-testid="shopping-cart-button" type="button">
            Carrinho de compras
          </button>
        </Link>
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
