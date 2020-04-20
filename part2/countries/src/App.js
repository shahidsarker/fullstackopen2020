import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const countriesHook = () => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(countriesHook, []);

  const handleFilter = (e) => {
    setFilter(e.target.value);
    console.log(e.target.value);
  };

  let display = "Please type a query";

  return (
    <div>
      <h2>Countries</h2>
      find countries <input value={filter} onChange={handleFilter} />
    </div>
  );
};

export default App;
