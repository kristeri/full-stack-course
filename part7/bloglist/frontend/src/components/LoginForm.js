import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../reducers/loginReducer";
import { Form, Container, Button } from "react-bootstrap";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(logIn(username, password));
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <Container>
        <h1>Log in</h1>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control id="username" type="text" value={username} name="Username" placeholder="Username" onChange={({ target }) => setUsername(target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control id="password" type="password" value={password} name="Password" placeholder="Password" onChange={({ target }) => setPassword(target.value)} />
          </Form.Group>
          <Button variant="success" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default LoginForm;
