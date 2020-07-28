import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const UsersList = () => {
  const users = useSelector((state) => state.users);
  const history = useHistory();

  return (
    <div>
      {users.map((user) => (
        <div key={user.id} onClick={() => history.push(`/users/${user.id}`)}>
          <p>{user.name}</p>
          <p>{user.blogs.length}</p>
        </div>
      ))}
    </div>
  );
};
export default UsersList;
