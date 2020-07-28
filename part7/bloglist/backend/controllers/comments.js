const commentsRouter = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");

commentsRouter.post("/", async (request, response) => {
  const body = request.body;
  const blog = await Blog.findById(body.blogId);
  const newComment = new Comment({
    content: body.content,
    blog: blog._id,
  });
  const savedComment = await newComment.save();
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();
  response.json(savedComment.toJSON());
});

commentsRouter.get("/", async (request, response) => {
  const comments = await Comment.find({});
  response.json(comments.map((comment) => comment.toJSON()));
});

module.exports = commentsRouter;
