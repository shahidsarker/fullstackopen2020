import React, { useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [filter, setFilter] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();

    // Check if name is already in phonebook
    if (persons.find((person) => person.name === newName)) {
      return alert(newName + " is already in phonebook");
    }

    const personObj = { name: newName, number: newNumber };
    setPersons(persons.concat(personObj));
    setNewName("");
    setNewNumber("");
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
