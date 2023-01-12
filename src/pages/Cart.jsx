import React, { Component } from 'react';
import { getProductById } from '../services/api';

export default class Cart extends Component {
  state = {
    productsList: [],
    productsList2: [],
  };

  componentDidMount() {
    this.handleCartProduct();
  }

  fetchProductId = async () => {
    const { productsList } = this.state;
    const productsObj = productsList.map(async (element) => {
      const response = await getProductById(element);
      return response;
    });
    this.setState({
      productsList2: productsObj,
    });
  };

  handleCartProduct = () => {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    this.setState({
      productsList: cartProducts,
    });
    this.fetchProductId();
  };

  render() {
    const { productsList2 } = this.state;
    console.log(productsList2);
    return (
      <div className="empty-cart-div">
        <h2 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h2>
      </div>
    );
  }
}
