import { ADD_FAVORITE, DELETE_FAVORITE } from '../actions/types';
import { omit, mapKeys } from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_FAVORITE: {
      return { ...state, ...mapKeys([action.payload], 'Key') }; // mapKeys take array of data and make object with id's of the data as keys
    }

    case DELETE_FAVORITE:
      return omit(state, action.payload); // omit removing the object by key and creating new array
    default:
      return state;
  }
};