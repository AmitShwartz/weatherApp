//reducers/index.js

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import forecastReducer from './forecastReducer';
import favoritesReducer from './favoritesReducer';

export default combineReducers({
  form: formReducer,
  forecast: forecastReducer,
  favorites: favoritesReducer
});