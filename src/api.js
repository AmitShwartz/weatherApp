API_KEY = "WLrP8SA2RHTjED3NWdTfXOG1MbwpQVWf"

import axios from "axios";

const BASE_URL = "http://dataservice.accuweather.com";
const generateUrl = path => `${BASE_URL}/${path}`;

const getLocation = async (path) => {
  await axios.get(generateUrl(path))
}