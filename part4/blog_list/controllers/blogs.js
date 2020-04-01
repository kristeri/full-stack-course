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

blogsRouter.delete("/blogs/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
