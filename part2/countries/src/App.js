import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ filter, onChange }) => (
  <div>
    find countries <input value={filter} onChange={onChange} />
  </div>
);

const Country = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    <div>capital: {country.capital}</div>
    <div>population: {country.population}</div>
    <h4>Languages</h4>
    <ul>
      {country.languages.map((language) => {
        return <li key={language.iso639_2}>{language.name}</li>;
      })}
    </ul>
    <img src={country.flag} alt={"Flag of " + country.name} width="500" />
  </div>
);

const CountryList = ({ countries, onClick }) => {
  return countries.map((country) => (
    <div key={country.name}>
      {country.name} <button onClick={() => onClick(country)}>show</button>
    </div>
  ));
};

const Display = ({ results, filter, onCountryClick }) => {
  if (filter === "") return "Please type a query";
  // if (results.length === 0) return "please try a different input";

  if (results.length > 10) return "too many matches, specify another filter";
  else if (results.length === 1) return <Country country={results[0]} />;
  else return <CountryList countries={results} onClick={onCountryClick} />;
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [results, setResults] = useState([]);

  const countriesHook = () => {
    console.log("effect");
    axios
      .get(
        "https://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag"
      )
      .then((response) => {
        setCountries(response.data);
        console.log(response.data.length);
      });
  };

  useEffect(countriesHook, []);

  console.log("countries", countries.length);

  const handleFilter = (e) => {
    setFilter(e.target.value);

    // if (filter !== "") {
    const newResults = countries.filter((country) => {
      return country.name.toLowerCase().includes(e.target.value);
    });
    setResults(newResults);
    // } else setResults([]);
  };
  const handleCountryClick = (country) => {
    setResults([country]);
  };

  return (
    <div>
      <h2>Countries</h2>
      <Filter value={filter} onChange={handleFilter} />
      <Display
        results={results}
        filter={filter}
        onCountryClick={handleCountryClick}
      />
    </div>
  );
};

export default App;
