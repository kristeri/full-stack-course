import React from "react";

const PersonForm = ({ addPerson, setNewName, setNewNumber }) => {
  return (
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
  );
};

export default PersonForm;
