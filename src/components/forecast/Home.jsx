import React from 'react';
import Forecast from './Forecast';
import Search from './Search';
import { Container, Grid } from 'semantic-ui-react';

const Home = () => {
  return (
    <>
      <Search />
      <Forecast />
    </>
  )
}

export default Home;