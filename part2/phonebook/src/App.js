import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "040-1234567" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = event => {
    event.preventDefault();
    const obj = { name: newName, number: newNumber };
    if (!persons.some(person => person.name === newName)) {
      const copy = [...persons];
      copy.push(obj);
      setPersons(copy);
    } else {
      window.alert(`${newName} is already added to phonebook.`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={event => setNewName(event.target.value)} />
        </div>
        <div>
          number: <input onChange={event => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => {
        return (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        );
      })}
    </div>
  );
};

export default App;
