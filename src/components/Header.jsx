import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <header>
        <input
          type="text"
          data-testid="query-input"
          name="searchValue"
          className="searchValue"
        />

        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link data-testid="shopping-cart-button" to="/cart">
          <button type="button">Carrinho de Compras</button>
        </Link>
      </header>
    );
  }
}
