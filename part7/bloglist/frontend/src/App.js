import React, { useEffect } from "react";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import NavMenu from "./components/NavMenu";
import BlogForm from "./components/BlogForm";
import UserView from "./components/UserView";
import Blog from "./components/Blog";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UsersList from "./components/UsersList";

import { initializeBlog } from "./reducers/blogsReducer";
import { useDispatch, useSelector } from "react-redux";
import { loggedUser } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { Container } from "react-bootstrap";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlog());
    dispatch(loggedUser());
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <Router>
          <NavMenu />
          <Container>
            <Switch>
              <Route path="/users">
                <UsersList />
              </Route>
              <Route path="/users/:id">
                <UserView />
              </Route>
              <Route path="/blogs/:id">
                <Blog />
              </Route>
              <Route path="/">
                <BlogForm />
              </Route>
            </Switch>
          </Container>
        </Router>
      )}
    </div>
  );
};

export default App;
