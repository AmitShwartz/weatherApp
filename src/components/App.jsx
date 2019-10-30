//components/App.js

import React from 'react';
import { Router, Route } from "react-router-dom";
import { connect } from 'react-redux'
import history from "../history";
import Header from './header/Header';
import Home from './forecast/Home';
import Footer from './footer/Footer'
import Favorites from './favorites/Favorites';
import { searchByCity } from '../actions/index'

class App extends React.Component {
  componentWillMount(){
    this.props.searchByCity({city:'tel aviv'})
  }
  render() {
    return (
      <div style={{ padding: '40px 0px' }}>
        <Router history={history}>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/favorites" component={Favorites} />
          <Footer />
        </Router>
      </div>
    );
  }

}

export default connect(
  null,
  { searchByCity }
)(App);
