const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  for (var i = 0; i < helper.initialBlogs.length; i++) {
    let blogObject = new Blog(helper.initialBlogs[i]);
    await blogObject.save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body.length).toBe(helper.initialBlogs.length);
});

test("blog post contains id_ as unique identifier property", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0]["_id"]).toBeDefined();
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Full Stack MOOC",
    author: "Unknown",
    url: "http://localhost:3001/api/blogs",
    likes: 0
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);
});

test("Likes property defaults to 0 if it is not defined", async () => {
  const newBlog = {
    title: "Blog without likes",
    author: "Unknown",
    url: "http://localhost:3001/api/blogs"
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const blogWithoutLike = blogsAtEnd.find(blog => blog.title === "Blog without likes");
  expect(blogWithoutLike.likes).toEqual(0);
});

afterAll(() => {
  mongoose.connection.close();
});
