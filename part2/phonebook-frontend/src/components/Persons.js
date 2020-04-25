import React from "react";

const Person = ({ person, onDelete }) => (
  <p>
    {person.name} {person.number} <button onClick={onDelete}>delete</button>
  </p>
);

const Persons = (props) => {
  // return ({props.persons.map((person) =>   <Person key={person.name} person={person}/>
  // )})

  return props.persons.map((person) => (
    <Person
      key={person.id}
      person={person}
      onDelete={() => props.onDelete(person)}
    />
  ));
};

export default Persons;
