import { getForecast, autoComplete, geoPosition } from "../config/api"
import { SEARCH, ADD_FAVORITE, DELETE_FAVORITE} from "./types"
import history from "../history"

export const searchByCity = ({ city }) => async dispatch => {
  try {
    const response = await autoComplete(city)
    const newItem = await getForecast(response.data[0])
    dispatch({ type: SEARCH, payload: newItem })
  } catch (e) {
    console.log(e)
  }
};

export const searchByGeoposition = coordinates => async dispatch => {
  try {
    const response = await geoPosition(coordinates)
    const newItem = await getForecast(response.data);
    dispatch({ type: SEARCH, payload: newItem });
  } catch (e) {
    console.log(e)
  }
};

export const searchByPos = city => async dispatch => {
  try {
    const newItem = await getForecast(city)
    dispatch({ type: SEARCH, payload: newItem })
    history.push('/')
  } catch (e) {
    console.log(e)
  }
};

export const addFavorite = (favorite) => {
  return { type: ADD_FAVORITE, payload: favorite }
};

export const deleteFavorite = (favorite_key) => {
  return { type: DELETE_FAVORITE, payload: favorite_key }
};