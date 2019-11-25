import React from 'react';
import { Router, Route } from "react-router-dom";
import { connect } from 'react-redux'
import history from "../history";
import Layout from './layout/Layout'
import Home from './forecast/Home'
import Favorites from './favorites/Favorites';
import { searchByCity } from '../actions/index'

const App = () => {
  return (
    <Router history={history}>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/favorites" component={Favorites} />
      </Layout>
    </Router>
  );
}

export default connect(
  null,
  { searchByCity }
)(App);