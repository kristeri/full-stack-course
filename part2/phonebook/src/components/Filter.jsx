import React from "react";

const Filter = ({ setFilter }) => {
  return (
    <div>
      Filter by name: <input onChange={event => setFilter(event.target.value)} />
    </div>
  );
};

export default Filter;
