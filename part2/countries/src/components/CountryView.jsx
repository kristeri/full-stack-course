import React, { useState } from "react";

const CountryView = ({ country, moreThanOne }) => {
  const [hide, toggleHide] = useState(true);

  const renderCountry = (country, moreThanOne) => {
    if (!moreThanOne) {
      return (
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
          <img src={country.flag} height={100} width={"auto"} alt={""} />
        </div>
      );
    } else {
      if (hide) {
        return (
          <div key={country.name}>
            <>
              <h1>{country.name}</h1>
              <button onClick={() => toggleHide(!hide)}>Show</button>
            </>
          </div>
        );
      } else {
        return (
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
            <img src={country.flag} height={100} width={"auto"} alt={""} />
            <button onClick={() => toggleHide(!hide)}>Hide</button>
          </div>
        );
      }
    }
  };

  return <div>{renderCountry(country, moreThanOne)}</div>;
};

export default CountryView;
