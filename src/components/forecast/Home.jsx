//components/forcast/Home

import React,{useState} from 'react';
import Forecast from './Forecast';
import Search from './Search';

const Home = () => {
  return (
    <>
      <Search />
      <Forecast />
    </>
  )
}

export default Home;