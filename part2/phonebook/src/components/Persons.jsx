import React from "react";
import personService from "../services/persons";

const Persons = ({ persons, setPersons, filter }) => {
  const removePerson = person => {
    if (window.confirm("Delete person " + person.name + "?")) {
      personService.remove(person.id).then(() => {
        personService.getAll().then(response => {
          setPersons(response.data);
        });
      });
    }
  };

  return (
    <div>
      {persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => {
          return (
            <div key={person.name}>
              <p>
                {person.name} {person.number}
              </p>
              <button onClick={() => removePerson(person)}>Delete</button>
            </div>
          );
        })}
    </div>
  );
};

export default Persons;
