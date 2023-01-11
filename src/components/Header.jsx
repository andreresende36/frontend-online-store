import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <header>
        <input
          type="text"
          data-testid="query-input"
          name="searchValue"
          className="input is-success is-fullwidth"
          value=""
        />

        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

      </header>
    );
  }
}
