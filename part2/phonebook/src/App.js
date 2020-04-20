import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "8675309" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={handleAdd}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}

      <code>
        <hr />
        debug:
        <div>newName:{newName}</div>
        <div>newNumber: {newNumber}</div>
      </code>
    </div>
  );
};

export default App;
