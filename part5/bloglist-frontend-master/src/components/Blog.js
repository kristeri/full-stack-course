import React from "react";
import Togglable from "./Togglable";
import blogService from "./../services/blogs";

const Blog = ({ blog, blogs, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = () => {
    let updatedBlog = { user: blog.user.id, likes: blog.likes, author: blog.author, title: blog.title, url: blog.url };

    updatedBlog.likes += 1;
    blogService.update(blog._id, updatedBlog).then((returnedBlog) => {
      let blogCopies = [...blogs];
      const foundIndex = blogCopies.findIndex((x) => x === blog);
      blogCopies[foundIndex] = returnedBlog;
      setBlogs(blogCopies);
    });
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabel="View" hideButtonLabel="Hide">
        <div>
          <p>{blog.url}</p>
          <span>Likes {blog.likes}</span>
          <button onClick={() => handleLike()}>Like</button>
          <p>{blog.user.name}</p>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
