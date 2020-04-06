import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const addBlog = (event) => {
    event.preventDefault();
    createBlog(newBlog);
    setNewBlog({ title: '', author: '', url: '' });
  };

  const handleBlogChange = (event, type) => {
    const newBlogCopy = { ...newBlog };
    switch (type) {
    case 'title':
      newBlogCopy.title = event.target.value;
      setNewBlog(newBlogCopy);
      break;
    case 'author':
      newBlogCopy.author = event.target.value;
      setNewBlog(newBlogCopy);
      break;
    case 'url':
      newBlogCopy.url = event.target.value;
      setNewBlog(newBlogCopy);
      break;
    default:
      return;
    }
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <h2>Create a new blog</h2>
        <div>
          <span>Title: </span>
          <input value={newBlog.title} onChange={(event) => handleBlogChange(event, 'title')} />
        </div>
        <div>
          <span>Author: </span>
          <input value={newBlog.author} onChange={(event) => handleBlogChange(event, 'author')} />
        </div>
        <div>
          <span>Url: </span>
          <input value={newBlog.url} onChange={(event) => handleBlogChange(event, 'url')} />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
