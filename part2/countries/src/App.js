import React, { useState, useEffect } from "react";
import axios from "axios";

const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;

const Filter = ({ filter, onChange }) => (
  <div>
    find countries <input value={filter} onChange={onChange} />
  </div>
);

const Weather = (props) => {
  const [weather, setWeather] = useState({});

  const params = {
    access_key: weather_api_key,
    query: props.capital,
  };
  const weatherHook = () => {
    axios
      .get("http://api.weatherstack.com/current", { params })
      .then((response) => {
        setWeather(response.data.current);
      })
      .catch((err) => console.log(err));
  };
  useEffect(weatherHook, []);

  let weatherDisplay;
  if (weather) {
    weatherDisplay = (
      <div>
        <div>
          <strong>temperature:</strong>
          {console.log("temp", weather.temperature)}
          {weather.temperature}
        </div>
        <img src={weather.weather_icons} alt="" />
        <div>
          <strong>wind:</strong>
          {weather.wind_speed} kph / direction {weather.wind_dir}
        </div>
      </div>
    );
  } else {
    weatherDisplay = "Loading weather...";
  }

  return (
    <div>
      <h4>Weather in {props.capital}</h4>
      {weatherDisplay}
    </div>
  );
};

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
    <img src={country.flag} alt={"Flag of " + country.name} height="200" />
    <Weather capital={country.capital} />
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
      })
      .catch((err) => console.log(err));
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
