const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/blogs", (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs);
  });
});

blogsRouter.post("/blogs", (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.title && !blog.url) {
    response.status(400).json();
  } else {
    blog.save().then(result => {
      response.status(201).json(result);
    });
  }
});

blogsRouter.put("/blogs/:id", (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON());
    })
    .catch(error => next(error));
});

blogsRouter.delete("/blogs/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
