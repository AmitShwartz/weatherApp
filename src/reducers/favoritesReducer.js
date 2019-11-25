import { ADD_FAVORITE, DELETE_FAVORITE } from '../actions/types';
import { omit, mapKeys } from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_FAVORITE: {
      return { ...state, ...mapKeys([action.payload], 'city.Key') }; 
    }
    case DELETE_FAVORITE:
      return omit(state, action.payload);
    default:
      return state;
  }
};