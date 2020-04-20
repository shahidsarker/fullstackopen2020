import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();

    // Check if name is already in phonebook
    if (persons.find((person) => person.name === newName)) {
      return alert(newName + " is already in phonebook");
    }

    const personObj = { name: newName };
    setPersons(persons.concat(personObj));
    setNewName("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" onClick={handleAdd}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}

      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
