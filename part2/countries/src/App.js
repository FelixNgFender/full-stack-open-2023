import { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar";
import Result from "./components/Result";
import countryService from "./services/countries";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const hook = () => {
    countryService
      .getAll()
      .then((countries) => {
        setCountries(countries);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(hook, []);
  return (
    <>
      <Searchbar
        query={query}
        setQuery={setQuery}
        countries={countries}
        setSelectedCountries={setSelectedCountries}
      />
      {countries.length === 0 ? null : (
        <Result selectedCountries={selectedCountries} />
      )}
    </>
  );
};

export default App;
