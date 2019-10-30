import { SEARCH_CITY, UPDATE_CITY } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case SEARCH_CITY:
      return action.payload; 
      case UPDATE_CITY:
          return action.payload; 
    default:
      return state;
  }
};