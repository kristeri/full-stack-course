import React, { useState } from "react";
import axios from "axios";
import CountryView from "./components/CountryView";

const App = () => {
  const [countries, setCountries] = useState([]);

  const searchCountries = text => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      const filteredCountries = response.data.filter(country => country.name.toLowerCase().includes(text.toLowerCase()));
      setCountries(filteredCountries);
    });
  };

  return (
    <div>
      Find countries <input onChange={event => searchCountries(event.target.value)} />
      <div>
        {countries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          <div>
            {countries.map(country => (
              <CountryView country={country} moreThanOne={countries.length > 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
