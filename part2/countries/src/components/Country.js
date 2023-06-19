import { useState, useEffect } from "react";
import weatherService from "../services/weather";

const Country = ({ selectedCountry }) => {
  return (
    <>
      <h2>{selectedCountry.name.common}</h2>
      <p>capital {selectedCountry.capital[0]}</p>
      <p>population {selectedCountry.population}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(selectedCountry.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={selectedCountry.flags.png} alt={selectedCountry.flags.alt} />
      <h2>Weather in {selectedCountry.capital[0]}</h2>
      <Weather selectedCountry={selectedCountry} />
    </>
  );
};

const Weather = ({ selectedCountry }) => {
  const [weather, setWeather] = useState(null);
  const hook = () => {
    weatherService
      .getCurrentWeather(selectedCountry)
      .then((weather) => {
        setWeather(weather);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(hook, [selectedCountry]);
  return !weather ? (
    <p>No weather information available</p>
  ) : (
    <>
      <p>temperature {weather.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  );
};

export default Country;
