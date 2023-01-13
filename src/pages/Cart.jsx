import React, { Component } from 'react';
import CartProduct from '../components/CartProduct';

export default class Cart extends Component {
  state = {
    productsList: [],
  };

  componentDidMount() {
    this.handleCartProduct();
  }

  handleCartProduct = async () => {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    console.log(cartProducts);
    this.setState({ productsList: cartProducts });
  };

  render() {
    const { productsList } = this.state;
    return (
      <div className="cart-div">
        <h2 data-testid="shopping-cart-empty-message">
          { productsList.length === 0
            ? 'Seu carrinho está vazio'
            : productsList.map((item) => (
              <CartProduct
                name={ item.productObj.title }
                image={ item.productObj.thumbnail }
                quantity={ item.quantity }
                price={ item.productObj.price }
                key={ item.productObj.id }
              />
            ))}
        </h2>
      </div>
    );
  }
}
