const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const { listWithManyBlogs, blogsInDb } = require("./test_helper");

const getToken = async () => {
  const response = await api.post("/api/login").send({
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
  });
  return response.body.token;
};
const token = getToken();

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = listWithManyBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`);

  expect(response.body).toHaveLength(listWithManyBlogs.length);
});

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`);

  expect(response.body[0].id).toBeDefined();
});

test("a valid blog can be added and its content is correct", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://www.testurl.com",
    likes: 5,
  };
  const blogObject = new Blog(newBlog);
  await blogObject.save();
  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(listWithManyBlogs.length + 1);

  const contents = blogsAtEnd.map((n) => n.title);
  expect(contents).toContain("Test Blog");
});

test("if likes property is missing from the request, it will default to the value 0", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://www.testurl.com",
  };
  const blogObject = new Blog(newBlog);
  await blogObject.save();
  const blogsAtEnd = await blogsInDb();
  const addedBlog = blogsAtEnd.find((blog) => blog.title === "Test Blog");
  expect(addedBlog.likes).toBe(0);
});

test("if title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request", async () => {
  const newBlog = {
    title: "Test Blog",
    likes: 5,
  };
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400);

  const newBlog2 = {
    author: "Test Author",
    likes: 5,
  };
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog2)
    .expect(400);
});

test("delete a blog post", async () => {
  const blogsAtStart = await blogsInDb();
  const blogToDelete = blogsAtStart[0];
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);
  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(listWithManyBlogs.length - 1);
  const contents = blogsAtEnd.map((r) => r.title);
  expect(contents).not.toContain(blogToDelete.title);
});

test("delete a blog post with invalid id", async () => {
  await api
    .delete("/api/blogs/123")
    .set("Authorization", `Bearer ${token}`)
    .expect(400);
});

test("update a blog post", async () => {
  const blogsAtStart = await blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  const updatedBlog = {
    title: "Updated Blog",
    author: "Updated Author",
    url: "http://www.updatedurl.com",
    likes: 10,
  };
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set("Authorization", `Bearer ${token}`)
    .send(updatedBlog)
    .expect(200);
  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(listWithManyBlogs.length);
  const contents = blogsAtEnd.map((r) => r.title);
  expect(contents).toContain("Updated Blog");
});

test("update a blog post with invalid id", async () => {
  const updatedBlog = {
    author: "Updated Author",
    title: "Updated Blog",
  };
  await api
    .put("/api/blogs/123")
    .set("Authorization", `Bearer ${token}`)
    .send(updatedBlog)
    .expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
