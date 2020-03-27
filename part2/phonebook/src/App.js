import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = event => {
    event.preventDefault();
    const obj = { id: persons[persons.length - 1].id + 1, name: newName, number: newNumber };
    if (!persons.some(person => person.name === newName)) {
      const copy = [...persons];
      copy.push(obj);
      setPersons(copy);
      personService.create(obj);
    } else {
      window.alert(`${newName} is already added to phonebook.`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />
      <PersonForm addPerson={addPerson} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h3>Add a new</h3>
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  );
};

export default App;
