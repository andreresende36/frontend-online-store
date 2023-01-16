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

  buttonClick = (item, sinal) => {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    const newCartProducts = cartProducts.map((element) => {
      if (element.productObj.id === item?.productObj?.id) {
        const newProduct = {
          ...item,
          quantity: sinal === '+'
            ? element.quantity + 1
            : element.quantity - 1,
        };
        if (newProduct.quantity < 1) {
          newProduct.quantity = 1;
        }
        return newProduct;
      }
      return element;
    });
    localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
    // }
    this.setState({ productsList: newCartProducts });
  };

  handleRemoveProduct = ({ target }) => {
    console.log(target.id);
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    console.log(cartProducts[0].productObj.id);
    console.log(cartProducts);
    const newCartProducts = cartProducts.filter((e) => e.productObj.id !== target.id);
    localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
    this.handleCartProduct();
  };

  render() {
    const { productsList } = this.state;
    return (
      <div className="cart-div">
        <h2 data-testid="shopping-cart-empty-message">
          { !productsList
            ? 'Seu carrinho está vazio'
            : productsList.map((item) => (
              <div key={ item.productObj.id }>
                <CartProduct
                  name={ item.productObj.title }
                  image={ item.productObj.thumbnail }
                  quantity={ item.quantity }
                  price={ item.productObj.price }

                />

                <button
                  data-testid="product-decrease-quantity"
                  type="button"
                  onClick={ () => this.buttonClick(item, '-') }
                >
                  -
                </button>
                <button
                  data-testid="product-increase-quantity"
                  type="button"
                  onClick={ () => this.buttonClick(item, '+') }
                >
                  {' '}
                  +
                  {' '}

                </button>
                <button
                  data-testid="remove-product"
                  type="button"
                  key={ item.productObj.id }
                  onClick={ this.handleRemoveProduct }
                  id={ item.productObj.id }
                >
                  Remover
                </button>
              </div>
            ))}
        </h2>
        <button
          data-testid="shopping-cart-button"
          type="button"
        >
          Finalizar Compra
        </button>
        <div />
      </div>
    );
  }
}
