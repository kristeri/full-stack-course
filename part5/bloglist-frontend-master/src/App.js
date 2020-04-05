import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong username or password.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUsername("");
    setPassword("");
    setBlogs([]);
    setUser(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = { ...newBlog };

    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setNewBlog({ title: "", author: "", url: "" });
      })
      .then(() => {
        setErrorMessage(`A new blog ${blogObject.title} by ${blogObject.author} added.`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleBlogChange = (event, type) => {
    const newBlogCopy = { ...newBlog };
    switch (type) {
      case "title":
        newBlogCopy.title = event.target.value;
        setNewBlog(newBlogCopy);
        break;
      case "author":
        newBlogCopy.author = event.target.value;
        setNewBlog(newBlogCopy);
        break;
      case "url":
        newBlogCopy.url = event.target.value;
        setNewBlog(newBlogCopy);
        break;
      default:
        return;
    }
  };

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <span>Title: </span>
        <input value={newBlog.title} onChange={(event) => handleBlogChange(event, "title")} />
      </div>
      <div>
        <span>Author: </span>
        <input value={newBlog.author} onChange={(event) => handleBlogChange(event, "author")} />
      </div>
      <div>
        <span>Url: </span>
        <input value={newBlog.url} onChange={(event) => handleBlogChange(event, "url")} />
      </div>
      <div>
        <button type="submit">Create</button>
      </div>
    </form>
  );

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => handleLogout()}>Logout</button>
          {blogForm()}
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
