import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Categories from './components/Categories';
import Header from './components/Header';
import Cart from './pages/Cart';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Header } />
        <Route exact path="/cart" component={ Cart } />
      </Switch>
      <Categories />
    </div>
  );
}

export default App;
