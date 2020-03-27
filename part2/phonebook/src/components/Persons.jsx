import React from "react";

const Persons = ({ persons, filter }) => {
  return (
    <div>
      {persons
        .filter(person => !person.name.toLowerCase().indexOf(filter.toLowerCase()))
        .map(person => {
          return (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          );
        })}
    </div>
  );
};

export default Persons;
