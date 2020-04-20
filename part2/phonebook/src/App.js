import React, { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const hook = () => {
    console.log("effect");
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  };
  useEffect(hook, []);

  const handleAdd = (e) => {
    e.preventDefault();

    // Check if name is already in phonebook
    if (persons.find((person) => person.name === newName)) {
      return alert(newName + " is already in phonebook");
    }

    const personObj = { name: newName, number: newNumber };
    personsService
      .create(personObj)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));

        setNewName("");
        setNewNumber("");
      })
      .catch((err) => console.log(err));
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const displayPersons =
    filter === ""
      ? persons
      : persons.filter((person) => person.name.toLowerCase().includes(filter));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />

      <h3>Add a new person</h3>
      <PersonForm
        nameInput={newName}
        onNameChange={handleNameChange}
        numberInput={newNumber}
        onNumberChange={handleNumberChange}
        onAdd={handleAdd}
      />

      <h3>Numbers</h3>

      {/* {displayPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))} */}
      <Persons persons={displayPersons} />

      <code>
        <hr />
        debug:
        <div>newName:{newName}</div>
        <div>newNumber: {newNumber}</div>
        <div>filter: {filter}</div>
      </code>
    </div>
  );
};

export default App;
