import axios from "axios";

// const API_KEY = "WLrP8SA2RHTjED3NWdTfXOG1MbwpQVWf"
const API_KEY = "ohBYbco8wD0dNMLlcY6A7cAfwkpYXeAS";
const BASE_URL = "https://dataservice.accuweather.com";

const weatherApi = axios.create({
  baseURL: BASE_URL,
  timeout: 2000
});

const currentConditions = locationKey => {
  return weatherApi.get(`/currentconditions/v1/${locationKey}`, {
    params: {
      apikey: API_KEY
    }
  })
}

const fiveDays = locationKey => {
  return weatherApi.get(`/forecasts/v1/daily/5day/${locationKey}`, {
    params: {
      apikey: API_KEY,
      metric: true
    }
  })
}

export const autoComplete = city => {
  console.log(city)
  return weatherApi.get('/locations/v1/cities/autocomplete', {
    params: {
      q: city,
      apikey: API_KEY
    }
  });
}

export const geoPosition = coordinates => {
  return weatherApi.get('/locations/v1/cities/geoposition/search', {
    params: {
      q: coordinates,
      apikey: API_KEY
    }
  })
}

export const getForecast = city => new Promise((resolve, reject) => {
  try {
    Promise.all([
      currentConditions(city.Key),
      fiveDays(city.Key)
    ]).then(async (values) => {
      console.log(values)
      resolve({ today: values[0].data[0], city: city, fiveDays: values[1].data });
    })
  } catch (e) {
    reject(e);
  }
})
