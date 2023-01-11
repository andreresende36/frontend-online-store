import React, { Component } from 'react';

const categoriesUrl = 'https://api.mercadolibre.com/sites/MLB/categories';

export default class Categories extends Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    const request = await fetch(categoriesUrl);
    this.setState({ categories: await request.json() });
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <p>Categorias</p>
        {categories.map((category) => (
          <>
            <label
              htmlFor={ category.name }
              key={ category.id }
              data-testid="category"
            >
              <input
                type="radio"
                name="category"
                id={ category.name }
              />
              { category.name }
            </label>
            <br />
          </>
        ))}
      </div>
    );
  }
}
