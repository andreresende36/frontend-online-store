import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CartButton extends Component {
  render() {
    const { size } = this.props;
    return (
      <button type="button" data-testid="shopping-cart-size">
        {`Carrinho de compras (${size})`}
      </button>
    );
  }
}

CartButton.propTypes = {
  size: PropTypes.number.isRequired,
};
