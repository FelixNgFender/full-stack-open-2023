import { useState } from "react";
import Country from "./Country";

const Result = ({ selectedCountries }) => {
  if (selectedCountries.length === 0) {
    return null;
  } else if (selectedCountries.length === 1) {
    return <Country selectedCountry={selectedCountries[0]} />;
  } else if (selectedCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else {
    return (
      <>
        {selectedCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}{" "}
            <ShowButton selectedCountry={country}></ShowButton>
          </div>
        ))}
      </>
    );
  }
};

const ShowButton = ({ selectedCountry }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  if (show) {
    return <Country selectedCountry={selectedCountry}></Country>;
  } else {
    return <button onClick={handleClick}>show</button>;
  }
};

export default Result;
