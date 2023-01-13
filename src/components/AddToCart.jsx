import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddToCart extends Component {
  handleAddToCartButton = () => {
    const { productObj } = this.props;

    // Puxa os ID's salvos no Local Storage
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    console.log(cartProducts);

    // Checa se existe algum produto repetido
    const checkProduct = cartProducts.some((e) => e.productObj.id === productObj.id);
    console.log(checkProduct);

    // Se não hover produto repetido, adiciona o produto com quantidade 1 na lista
    if (!checkProduct) {
      const newProduct = [...cartProducts, { productObj, quantity: 1 }];
      localStorage.setItem('cartProducts', JSON.stringify(newProduct));
    } else {
      // Caso haja algum produto repetido, apenas é iterado uma unidade à propriedade quantidade
      const newCartProducts = cartProducts.map((e) => {
        if (e.productObj.id === productObj.id) {
          const newProduct = { productObj, quantity: e.quantity + 1 };
          return newProduct;
        }
        return e;
      });
      localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
    }
  };

  render() {
    return (
      <button
        type="button"
        data-testid="product-add-to-cart"
        onClick={ this.handleAddToCartButton }
      >
        Adicionar ao Carrinho
      </button>
    );
  }
}

AddToCart.propTypes = {
  productObj: PropTypes.string.isRequired,
};
