import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Togglable from "./Togglable";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogsReducer";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogForm = () => {
  const dispatch = useDispatch();
  const blogList = useSelector((state) => state.blogs);
  const blogFormRef = React.createRef();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleAuthorChange = (event) => setAuthor(event.target.value);
  const handleUrlChange = (event) => setUrl(event.target.value);

  const addNewBlog = (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };
    try {
      dispatch(createBlog(newBlog));
      dispatch(setNotification(`A new blog: '${newBlog.title}' by '${newBlog.author} added'`, false));
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true));
    }
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2 className="blogFormHeadLine">Blogs</h2>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <Form onSubmit={addNewBlog}>
          <h2>Create a new blog</h2>
          <Form.Group as={Row}>
            <Form.Label>Title:</Form.Label>
            <Col>
              <Form.Control id="title" value={title} onChange={handleTitleChange} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label>Author:</Form.Label>
            <Col>
              <Form.Control id="author" value={author} onChange={handleAuthorChange} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label>Url:</Form.Label>
            <Col>
              <Form.Control id="url" value={url} onChange={handleUrlChange} />
            </Col>
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </Togglable>
      <div>
        <Container>
          {blogList.map((blog) => (
            <li key={blog.id} className="blogList">
              {blog.title}
              <Link to={`/blogs/${blog.id}`}>
                <Button variant="outline-success" className="blogButton" key={blog.id}>
                  View
                </Button>
              </Link>
            </li>
          ))}
        </Container>
      </div>
    </div>
  );
};

export default BlogForm;
