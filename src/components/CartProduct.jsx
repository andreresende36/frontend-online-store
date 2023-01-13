import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CartProduct extends Component {
  render() {
    const { name, image, price, quantity } = this.props;
    return (
      <div className="cardCartProduct">
        {/* Imagem */}
        <img src={ image } alt={ name } className="imgCartProduct" />
        {/* Nome do Produto */}
        <span
          className="nameCartProduct"
          data-testid="shopping-cart-product-name"
        >
          { name }
        </span>
        {/* Quantidade */}
        <span
          className="quantity"
          data-testid="shopping-cart-product-quantity"
        >
          { quantity }
        </span>
        {/* Preço do produto */}
        <span
          className="priceCartProduct"
        >
          { `R$${price}` }
        </span>
      </div>
    );
  }
}

CartProduct.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};
