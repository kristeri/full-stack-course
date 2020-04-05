import React from "react";
import Togglable from "./Togglable";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabel="View" hideButtonLabel="Hide">
        <div>
          <p>{blog.url}</p>
          <p>Likes {blog.likes}</p>
          <p>{blog.user.name}</p>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
