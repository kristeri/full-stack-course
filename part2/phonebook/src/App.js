import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(false);

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
      personService
        .create(obj)
        .then(() => {
          setErrorMessage(`Added ${newName}.`);
          setPersons(copy);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
        .catch(error => {
          setIsError(true);
          setErrorMessage(`Person validation failed: ${JSON.stringify(error.response.data)}.`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(persons.find(person => person.name === newName).id, obj)
          .then(response => {
            setErrorMessage(`Changed number for ${newName}.`);
            setTimeout(() => {
              setErrorMessage(null);
              setIsError(false);
            }, 5000);
            personService.getAll().then(response => {
              setPersons(response.data);
            });
          })
          .catch(error => {
            setIsError(true);
            setErrorMessage(`Information of ${newName} has already been removed from the server.`);
            personService.getAll().then(response => {
              setPersons(response.data);
            });
            setTimeout(() => {
              setErrorMessage(null);
              setIsError(false);
            }, 5000);
          });
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} isError={isError} />
      <Filter setFilter={setFilter} />
      <PersonForm addPerson={addPerson} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h3>Add a new</h3>
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  );
};

export default App;
