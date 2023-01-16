import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import RatingContainer from '../components/RatingContainer';

export default class Product extends Component {
  state = {
    productObj: {},
  };

  componentDidMount() {
    this.handleProduct();
  }

  handleProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getProductById(id);
    this.setState({ productObj: response });
  };

  handleAddToCartButton = () => {
    const { productObj } = this.state;
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    const checkProduct = cartProducts.some((e) => e.productObj.id === productObj.id);
    if (checkProduct) {
      const newCartProducts = cartProducts.map((e) => ((e.productObj.id === productObj.id)
        ? { productObj, quantity: e.quantity + 1 }
        : e));
      localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
    } else {
      const newProduct = [...cartProducts, { productObj, quantity: 1 }];
      localStorage.setItem('cartProducts', JSON.stringify(newProduct));
    }
  };

  render() {
    const { productObj } = this.state;
    const { match: { params: { id } } } = this.props;
    return (
      <div>
        <h1 data-testid="product-detail-name">
          { productObj.title }
        </h1>
        <p data-testid="product-detail-price">
          { `Preço: R$${productObj.price}` }
        </p>
        <div>
          <img
            src={ productObj.thumbnail }
            alt={ productObj.title }
            data-testid="product-detail-image"
          />
        </div>
        <Link
          to="/Cart"
        >
          <button data-testid="shopping-cart-button" type="button">
            Carrinho de compras
          </button>
        </Link>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.handleAddToCartButton }
        >
          Adicionar ao carrinho
        </button>
        <RatingContainer productId={ id } />
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
