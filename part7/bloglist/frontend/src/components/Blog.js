import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { createComment } from "../reducers/blogsReducer";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { likeBlog, deleteBlog } from "../reducers/blogsReducer";

const Blog = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  const [newContent, setNewContent] = useState("");
  const handleContentChange = (event) => setNewContent(event.target.value);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const blog = blogs.find((n) => n.id === id);

  if (!blog) {
    return null;
  }

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog '${blog.title}' by '${blog.author}'?`)) {
      dispatch(deleteBlog(blog));
      dispatch(setNotification(`'${blog.title}' has been deleted`, false));
      history.push("/");
    }
  };

  const handleLike = (blog) => {
    dispatch(likeBlog(blog));
  };

  const addComment = (event) => {
    event.preventDefault();
    dispatch(createComment({ content: newContent, blogId: blog.id }));
    setNewContent("");
  };

  return (
    <div style={blogStyle}>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <Link to={blog.url} key={blog.id} className="link">
        {blog.url}
      </Link>
      <p>{blog.url}</p>
      <span id={"blogLikes"}>Likes {blog.likes}</span>
      <button id="like" onClick={() => handleLike(blog)}>
        Like
      </button>
      <p>Created by {blog.user.name}</p>
      <button onClick={() => removeBlog(blog)}>Remove</button>
      <h5>Comments</h5>
      <form onSubmit={addComment}>
        <div>
          <input id="content" value={newContent} onChange={handleContentChange} />
          <button type="submit">Comment</button>
        </div>
      </form>
      <div>
        {blog.comments.map((comment) => (
          <div className="commentStyle" key={comment.id}>
            {comment.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
