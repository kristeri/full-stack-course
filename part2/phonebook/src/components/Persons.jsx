import React from "react";
import personService from "../services/persons";

const Persons = ({ persons, setPersons, filter }) => {
  const removePerson = person => {
    if (window.confirm("Delete person " + person.name + "?")) {
      let copy = [...persons];
      copy = copy.filter(function(obj) {
        return obj.id !== person.id;
      });
      setPersons(copy);
      personService.remove(person.id);
    }
  };

  return (
    <div>
      {persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => {
          return (
            <div>
              <p key={person.name}>
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
