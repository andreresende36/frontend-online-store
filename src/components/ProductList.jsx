import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart';

class ProductList extends React.Component {
  componentDidMount() {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    if (!cartProducts) {
      localStorage.setItem('cartProducts', JSON.stringify([]));
    }
  }

  render() {
    const { products, handleSize } = this.props;
    return (
      <>
        {products.map((element) => (
          <>
            <Link
              to={ `/product-details/${element.id}` }
              data-testid="product-detail-link"
              key={ element.id }
            >
              <div
                key={ element.id }
                data-testid="product"
              >
                <h2>{ element.title }</h2>
                <img src={ element.thumbnail } alt={ element.title } />
                <p>{ element.price }</p>
              </div>
            </Link>
            <AddToCart
              productObj={ element }
              handleSize={ handleSize }
            />
          </>
        ))}
      </>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf({
    id: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  handleSize: PropTypes.func.isRequired,
};

export default ProductList;
