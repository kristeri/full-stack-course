const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {}).populate("comments");
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {}).populate("comments");
  response.json(blog.toJSON());
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = await User.findById(request.verify.id);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.json(savedBlog.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = await User.findById(request.verify.id);
  const blog = await Blog.findById(request.params.id).populate("user", { username: 1, name: 1, id: 1 });
  if (blog.user._id.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true });
  response.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
