import React, { useState } from "react";
import blogService from "./../services/blogs";

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = () => {
    let updatedBlog = { user: blog.user.id, likes: blog.likes, author: blog.author, title: blog.title, url: blog.url };
    setBlogs([]);
    updatedBlog.likes += 1;
    blogService.update(blog._id, updatedBlog).then((returnedBlog) => {
      let blogCopies = [...blogs];
      const foundIndex = blogCopies.findIndex((x) => x === blog);
      blogCopies[foundIndex] = returnedBlog;
      setBlogs(blogCopies);
    });
  };

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog._id).then(() => {
        let blogsAfterDelete = [...blogs];
        blogsAfterDelete = blogsAfterDelete.filter((item) => item !== blog);
        setBlogs(blogsAfterDelete);
      });
    }
  };

  return (
    <div style={blogStyle} name="blog">
      <div>
        {blog.title} {blog.author}
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <span id={"blogLikes"}>Likes {blog.likes}</span>
          <button id="like" onClick={() => handleLike()}>
            Like
          </button>
          <p>{blog.user.name}</p>
          {user.username === blog.user.username && <button onClick={() => removeBlog()}>Remove</button>}
        </div>
      )}
      <button onClick={() => setVisible(!visible)}>{visible ? "Hide" : "View"}</button>
    </div>
  );
};

export default Blog;
