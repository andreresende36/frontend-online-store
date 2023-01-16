import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RatingContainer extends Component {
  state = {
    email: '',
    rating: '',
    text: '',
    error: false,
    arrayRatings: [],
  };

  componentDidMount() {
    const { productId } = this.props;
    const ratings = JSON.parse(localStorage.getItem(productId));
    if (!ratings) {
      localStorage.setItem(productId, JSON.stringify([]));
    }
    this.setState({
      arrayRatings: JSON.parse(localStorage.getItem(productId)) });
  }

  handleClick = () => {
    const { email, rating } = this.state;
    const emailRegex = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
    const validation = email !== '' && rating !== '' && emailRegex.test(email);
    if (!validation) {
      this.setState({ error: true });
    } else {
      this.saveRating();
    }
  };

  saveRating = () => {
    const { email, rating, text } = this.state;
    const { productId } = this.props;
    const newRating = {
      email,
      text,
      rating,
    };
    const ratings = JSON.parse(localStorage.getItem(productId));
    const newArray = [...ratings, newRating];
    localStorage.setItem(productId, JSON.stringify(newArray));
    this.setState({
      email: '',
      rating: '',
      text: '',
      arrayRatings: newArray });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value, error: false });
  };

  ratingFunc = () => {
    const arrayIndex = [];
    const maxIndex = 5;
    for (let i = 1; i <= maxIndex; i += 1) {
      arrayIndex.push(i);
    }
    return arrayIndex.map((i) => (
      <label
        htmlFor={ `rating-${i}` }
        key={ i }
      >
        { i }
        <input
          type="radio"
          name="rating"
          id={ `rating-${i}` }
          data-testid={ `${i}-rating` }
          onChange={ this.handleChange }
          value={ i }
        />
      </label>
    ));
  };

  render() {
    const { handleClick,
      handleChange,
      ratingFunc,
      state: { email, text, error, arrayRatings } } = this;
    const form = (
      <>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Digite seu email"
          data-testid="product-detail-email"
          onChange={ handleChange }
          value={ email }
        />
        <div className="rating-radios">
          { ratingFunc() }
        </div>
        <textarea
          name="text"
          id="text"
          placeholder="Mensagem(opcional)"
          data-testid="product-detail-evaluation"
          onChange={ handleChange }
          value={ text }
        />
        <button
          type="button"
          data-testid="submit-review-btn"
          onClick={ handleClick }
        >
          Avaliar
        </button>
        { error
          ? (
            <>
              <span data-testid="error-msg">Campos inválidos</span>
              <br />
            </>
          )
          : null }
      </>);
    return (
      <>
        {/* Formulário de Avaliação */}
        <form className="rating-form">
          {/* Texto inicial */}
          <h2>Avalie este produto</h2>
          { form }
        </form>

        {/* Avaliações passadas */}
        <div className="past-rating-container">
          <h3>Veja o que nossos clientes estão dizendo sobre este produto:</h3>
          { arrayRatings
            ? (arrayRatings.map((rating, index) => (
              <div
                key={ index }
                className="saved-rating"
              >
                <p data-testid="review-card-email">{ rating.email }</p>
                <p data-testid="review-card-rating">{ rating.rating }</p>
                <p data-testid="review-card-evaluation">{ rating.text }</p>
                <span data-testid="category"> </span>
                <span data-testid="product-detail-link"> </span>
              </div>)))
            : null}
        </div>
      </>
    );
  }
}

RatingContainer.propTypes = {
  productId: PropTypes.string.isRequired,
};
