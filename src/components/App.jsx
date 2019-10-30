//components/App.js

import React from 'react';
import { Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import history from "../history";
import Header from './header/Header';
import Home from './forecast/Home';
import Favorites from './favorites/Favorites';

const App = () => {
  return (
    <>
      <Router history={history}>
        <Header />
          <Route exact path="/" component={Home} />
          <Route path="/favorites" component={Favorites} />
      </Router>
    </>
  );
}
export default App;
