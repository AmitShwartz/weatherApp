import axios from "axios";
import { SEARCH_CITY, SEARCH_LOCATION, ADD_FAVORITE, DELETE_FAVORITE, UPDATE_CITY } from "./types";
import history from "../history";

// const API_KEY = "WLrP8SA2RHTjED3NWdTfXOG1MbwpQVWf"
const API_KEY = "ohBYbco8wD0dNMLlcY6A7cAfwkpYXeAS";
const BASE_URL = "https://dataservice.accuweather.com";

const getForecast = async (city) => {
  const today = await axios.get(`${BASE_URL}/currentconditions/v1/${city.Key}`, {
    params: {
      apikey: API_KEY
    }
  })
  const fiveDays = await axios.get(`${BASE_URL}/forecasts/v1/daily/5day/${city.Key}`, {
    params: {
      apikey: API_KEY,
      metric: true
    }
  })
  return { today: today.data[0], city: city, fiveDays: fiveDays.data }
}

export const searchByCity = ({ city }) => async dispatch => {
  const autocomplete = await axios.get(`${BASE_URL}/locations/v1/cities/autocomplete`, {
    params: {
      q: city,
      apikey: API_KEY
    }
  });
  const newItem = await getForecast(autocomplete.data[0]);
  dispatch({ type: SEARCH_CITY, payload: newItem });
};

export const searchByGeoposition = geoposition => async dispatch => {
  const location = await axios.get(`${BASE_URL}/locations/v1/cities/geoposition/search`, {
    params: {
      q: geoposition,
      apikey: API_KEY
    }
  });
  const newItem = await getForecast(location.data);
  dispatch({ type: SEARCH_LOCATION, payload: newItem });
};

export const searchByPos = city => async dispatch => {
  const newItem = await getForecast(city);
  dispatch({ type: UPDATE_CITY, payload: newItem });
  history.push('/');
};

export const addFavorite = (favorite) => async dispatch => {
  dispatch({ type: ADD_FAVORITE, payload: favorite });
}

export const deleteFavorite = (favorite_key) => async dispatch => {
  dispatch({ type: DELETE_FAVORITE, payload: favorite_key });
}