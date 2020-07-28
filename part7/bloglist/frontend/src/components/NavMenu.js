import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { logOut } from "../reducers/loginReducer";

const NavMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logOut());
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Blog app</Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
            <Nav.Item>
              <Nav.Link onClick={(e) => history.push("/")}>Blogs</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={(e) => history.push("/users")}>Users</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link>{user.name} logged in</Nav.Link>
            <Nav.Link>
              <button onClick={(event) => handleLogout(event)}>Logout</button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavMenu;
