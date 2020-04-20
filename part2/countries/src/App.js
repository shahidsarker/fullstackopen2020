import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <img src={country.flag} alt={"Flag of " + country.name} />
  </div>
);

const CountryList = ({ countries }) => {
  return countries.map((country) => (
    <div key={country.name}>{country.name}</div>
  ));
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const countriesHook = () => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
      console.log(response.data.length);
    });
  };

  useEffect(countriesHook, []);

  console.log("countries", countries.length);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  let display = "Please type a query";
  let results = [];
  if (filter !== "") {
    results = countries.filter((country) => {
      return country.name.toLowerCase().includes(filter);
    });
  }
  if (results.length > 10) display = "too many matches, specify another filter";
  else if (results.length === 1) display = <Country country={results[0]} />;
  else display = <CountryList countries={results} />;

  return (
    <div>
      <h2>Countries</h2>
      find countries <input value={filter} onChange={handleFilter} />
      <div>{display}</div>
    </div>
  );
};

export default App;
