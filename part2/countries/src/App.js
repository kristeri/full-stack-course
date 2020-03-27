import React, { useState } from "react";
import axios from "axios";

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
              <div key={country.name}>
                <h1>{country.name}</h1>
                <p>capital: {country.capital}</p>
                <p>population: {country.population}</p>
                <h2>Languages:</h2>
                <ul>
                  {country.languages.map(language => {
                    return <li>{language.name}</li>;
                  })}
                </ul>
                <img src={country.flag} height={100} width={"auto"} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
