const request = require("supertest");
const app = require("../../app");

const { createInitialData, clearDb, terminate, DATA } = require("./config");

beforeEach(async function () {
  try {
    await createInitialData();
  } catch (e) {
    console.error(e);
  }
});

afterEach(async function () {
  try {
    await clearDb();
  } catch (e) {
    console.error(e);
  }
});

describe("POST /user", async () => {
  test("should register a new user", async () => {
    const response = await request(app).post("/users").send({
      username: "user",
      password: "password",
      first_name: "Test",
      last_name: "Example",
      email: "dummyMail@mail.com",
      photo_url: "https://example.com/png.jpeg",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  test("should not register a new user with invalid data", async () => {
    const response = await request(app).post("/users").send({
      username: "user",
      password: "password",
      first_name: "Test",
      last_name: "Example",
      email: 123,
      photo_url: 123,
    });

    expect(response.statusCode).toBe(400);
  });

  test("should not register a new user with duplicated username", async () => {
    const response = await request(app).post("/users").send({
      username: "test",
      password: "password",
      first_name: "Test",
      last_name: "Example",
      email: "dummyMail@mail.com",
      photo_url: "https://example.com/png.jpeg",
    });

    expect(response.statusCode).toBe(500);
  });

  test("should not register a new user with duplicated email", async () => {
    const response = await request(app).post("/users").send({
      username: "test",
      password: "password",
      first_name: "Test",
      last_name: "Example",
      email: "test@mail.com",
      photo_url: "https://example.com/png.jpeg",
    });

    expect(response.statusCode).toBe(500);
  });
});

describe("GET /users", async () => {
  test("should get all users (authenticated)", async () => {
    const response = await request(app).get(
      `/users/?_token=${DATA.tokens.userToken}`
    );

    expect(response.body.users).toHaveLength(2);
  });

  test("should respond with 401 unauthorized (not authenticated)", async () => {
    const response = await request(app).get("/users");

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.text).message).toBe("Unauthorized");
  });
});

describe("GET /users/:username", async () => {
  test("should get 1 user", async () => {
    const response = await request(app).get(
      `/users/test?_token=${DATA.tokens.userToken}`
    );

    expect(response.body.username).toBe("test");
    expect(response.body.email).toBe("test@mail.com");
  });

  test("should respond with 401 unauthorized (not authenticated)", async () => {
    const response = await request(app).get("/users/test");

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.text).message).toBe("Unauthorized");
  });

  test("should respond with 404 if no user found", async () => {
    const response = await request(app).get(
      `/users/nonexistent?_token=${DATA.tokens.userToken}`
    );

    expect(response.statusCode).toBe(404);
  });
});

describe("PATCH /users/:id", async () => {
  test("should update the user's information (admin)", async () => {
    const response = await request(app).patch("/users/test2").send({
      first_name: "new name",
      last_name: "new last name",
      _token: DATA.tokens.adminToken,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.first_name).toBe("new name");
    expect(response.body.last_name).toBe("new last name");
  });

  test("should update the user's information (correct user)", async () => {
    const response = await request(app).patch("/users/test2").send({
      username: "newTest",
      first_name: "new name",
      last_name: "new last name",
      email: "newtest@mail.com",
      _token: DATA.tokens.userToken,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe("newTest");
    expect(response.body.email).toBe("newtest@mail.com");
    expect(response.body.first_name).toBe("new name");
    expect(response.body.last_name).toBe("new last name");
  });

  test("should not update the user's information (incorrect user)", async () => {
    const response = await request(app).patch("/users/test1").send({
      username: "newTest",
      first_name: "new name",
      last_name: "new last name",
      email: "newtest@mail.com",
      _token: DATA.tokens.userToken,
    });

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.text).message).toBe("Unauthorized");
  });

  test("should return 404 error if no user found", async () => {
    const response = await request(app).patch("/users/nonexistent").send({
      first_name: "new name",
      last_name: "new last name",
      _token: DATA.tokens.adminToken,
    });

    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE /users/:id", async () => {
  test("should delete the specified user (admin)", async () => {
    const response = await request(app).delete(
      `/users/test2?_token=${DATA.tokens.adminToken}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Successfully deleted user test2");
  });

  test("should delete the specified user (correct user)", async () => {
    const response = await request(app).delete(
      `/users/test2?_token=${DATA.tokens.userToken}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Successfully deleted user test2");
  });

  test("should respond with 401 unauthorized (incorrect user)", async () => {
    const response = await request(app).delete(
      `/users/test?_token=${DATA.tokens.userToken}`
    );

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.text).message).toBe("Unauthorized");
  });

  test("returns 404 error if user not found", async () => {
    const response = await request(app).delete(
      `/users/nonexistent?_token=${DATA.tokens.adminToken}`
    );

    expect(response.statusCode).toBe(404);
  });
});

afterAll(async () => {
  await terminate();
});
