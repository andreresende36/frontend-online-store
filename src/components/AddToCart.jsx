import React, { Component } from 'react';
import { getProductById } from '../services/api'

export default class AddToCart extends Component {

  saveInCart = ({target: { value }})  => {
   const cartProducts = JSON.parse(localStorage.getItem('cartProducts'))   
    const newProduct = [...cartProducts, value]
    localStorage.setItem('cartProducts', JSON.stringify(newProduct))
}

  render() {
    const { value } = this.props

    return (
      <button
        type="button"
        data-testid="product-add-to-cart"
        qonClick={ this.saveInCart }
        value={value}
      >
        Adicionar ao Carrinho
      </button>
    );
  }
}