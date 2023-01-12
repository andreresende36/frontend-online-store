import React from 'react';
import { Link } from 'react-router-dom';
import ProdutcList from '../components/ProductList';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    products: {},
    query: '',
  };

  handleChanges = ({ target }) => {
    this.setState({ query: target.value });
  };

  submitHandle = async () => {
    const { query } = this.state;
    const getProducts = await getProductsFromCategoryAndQuery(query);
    this.setState({ products: getProducts.results });
  };

  render() {
    const { products } = this.state;
    return (
      <section>
        <div>
          <label htmlFor="search">
            Pesquisa:
            <input
              id="search"
              data-testid="query-input"
              type="text"
              onChange={ this.handleChanges }
            />
          </label>
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.submitHandle }
          >
            Pesquisar
          </button>
          <Link
            to="/Cart"
            data-testid="shopping-cart-button"
          >
            Carrinho de compras
          </Link>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>
        <div>
          {products.length > 0
            ? (products.map(({ title, thumbnail, price }, index) => (
              <ProdutcList
                key={ index }
                title={ title }
                thumbnail={ thumbnail }
                price={ price }
                data-testid="product"
              />
            )))
            : <p>Nenhum produto foi encontrado</p> }
        </div>
      </section>
    );
  }
}

export default Home;
