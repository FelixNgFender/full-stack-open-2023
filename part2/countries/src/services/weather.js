import axios from "axios";

const baseUrl = "http://api.openweathermap.org/";

const getCurrentWeather = (country) => {
  if (!country.capitalInfo.latlng) {
    return Promise.reject("No capital info");
  }
  const [lat, lon] = country.capitalInfo.latlng;
  const request = axios.get(
    `${baseUrl}data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
  );
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getCurrentWeather };
