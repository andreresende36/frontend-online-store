import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';

function App() {
  return (

    <div>
      <Switch>
        <Route exact path="/" component={ Header } />
      </Switch>

    </div>
  );
}

export default App;
