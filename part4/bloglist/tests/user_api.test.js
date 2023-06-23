const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);

const { usersInDb } = require("./test_helper");

test("users are returned as json", async () => {
  await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("invalid user is not added", async () => {
  const usersAtStart = await usersInDb();
  const newUser = {
    username: "te",
    name: "Test User",
    password: "te",
  };
  await api.post("/api/users").send(newUser).expect(400);
  const usersAtEnd = await usersInDb();
  expect(usersAtEnd).toHaveLength(usersAtStart.length);

  const contents = usersAtEnd.map((n) => n.username);
  expect(contents).not.toContain("te");
});

test("invalid user add requests have correct error message", async () => {
  const newUser = {
    username: "tea",
    name: "Test User",
    password: "te",
  };
  const response = await api.post("/api/users").send(newUser).expect(400);
  expect(response.body.error).toContain(
    "password must be at least 3 characters long"
  );

  const newUser2 = {
    username: "te",
    name: "Test User",
    password: "test",
  };
  const response2 = await api.post("/api/users").send(newUser2).expect(400);
  expect(response2.body.error).toContain(
    "User validation failed: username: Path `username` (`te`) is shorter than the minimum allowed length (3)."
  );
});

afterAll(() => {
  mongoose.connection.close();
});
