//actions/index.js

import axios from "axios";
import { SEARCH_CITY, ADD_FAVORITE, DELETE_FAVORITE } from "./types";
import history from "../history";

const API_KEY = "WLrP8SA2RHTjED3NWdTfXOG1MbwpQVWf"
const BASE_URL = "http://dataservice.accuweather.com";

//const generateUrl = path => `${BASE_URL}/${path}`;

export const searchByCity = ({ city }) => async dispatch => {
  try {
    const autocomplete = await axios.get(`${BASE_URL}/locations/v1/cities/autocomplete`, {
      params: {
        q: city,
        apikey: API_KEY
      }
    });
    const today = await axios.get(`${BASE_URL}/currentconditions/v1/${autocomplete.data[0].Key}`, {
      params: {
        apikey: API_KEY
      }
    })
    const fiveDays = await axios.get(`${BASE_URL}/forecasts/v1/daily/5day/${autocomplete.data[0].Key}`, {
      params: {
        apikey: API_KEY,
        metric: true
      }
    })
    const newItem = { today:today.data[0], city: autocomplete.data[0], fiveDays: fiveDays.data };

    console.log(today.data);
    dispatch({ type: SEARCH_CITY, payload: newItem });
  } catch (e) {
    console.error(e);
  }
};

export const addFavorite= (favorite) =>async dispatch => {
  console.log(favorite)
    dispatch({ type: ADD_FAVORITE, payload: favorite });
}

export const deleteFavorite= (favorite_key) =>async dispatch => {
  dispatch({ type: DELETE_FAVORITE, payload: favorite_key });
}