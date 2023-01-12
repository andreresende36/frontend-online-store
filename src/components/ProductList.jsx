import PropTypes from 'prop-types';
import React from 'react';

class ProdutcList extends React.Component {
  render() {
    const { products } = this.props;
    return (
      <>
        {products.map((element) => (
          <div
            data-testid="product"
            key={ element.id }
          >
            <h2>{ element.title }</h2>
            <img src={ element.thumbnail } alt={ element.title } />
            <p>{ element.price }</p>
          </div>
        ))}
      </>
    );
  }
}

ProdutcList.propTypes = {
  products: PropTypes.arrayOf({
    id: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default ProdutcList;
