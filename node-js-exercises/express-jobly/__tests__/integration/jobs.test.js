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

describe("POST /jobs", async () => {
  test("should create a new job (admin)", async () => {
    const response = await request(app).post("/jobs").send({
      title: "Job Title",
      salary: 120000,
      equity: 0.6,
      company_handle: "TST",
      _token: DATA.tokens.adminToken,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.job).toHaveProperty("id");
  });

  test("should not create a new job (user)", async () => {
    const response = await request(app).post("/jobs").send({
      title: "Job Title",
      salary: 120000,
      equity: 0.6,
      company_handle: "TST",
      _token: DATA.tokens.userToken,
    });

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.text).message).toBe(
      "Unauthorized, admin privileges required"
    );
  });
});

describe("GET /jobs", async () => {
  test("should get all jobs (authenticated)", async () => {
    const response = await request(app).get(
      `/jobs/?_token=${DATA.tokens.userToken}`
    );

    expect(response.body.jobs).toHaveLength(2);
  });

  test("should respond with 401 unauthorized (not authenticated)", async () => {
    const response = await request(app).get("/jobs");

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.text).message).toBe("Unauthorized");
  });
});

describe("GET /jobs/:id", async () => {
  test("should get 1 job", async () => {
    const response = await request(app).get(
      `/jobs/1?_token=${DATA.tokens.userToken}`
    );
    console.log(DATA);
    expect(response.body.title).toBe("test job");
    expect(response.body.id).toEqual(expect.any(Number));
  });

  test("should respond with 401 unauthorized (not authenticated)", async () => {
    const response = await request(app).get("/jobs/1");

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.text).message).toBe("Unauthorized");
  });

  test("should respond with 404 if no company found", async () => {
    const response = await request(app).get(
      `/jobs/3?_token=${DATA.tokens.userToken}`
    );

    expect(response.statusCode).toBe(404);
  });
});

describe("PATCH /jobs/:id", async () => {
  test("should update the jobs's information (admin)", async () => {
    const response = await request(app).patch("/jobs/1").send({
      title: "new test title",
      salary: 120000,
      equity: 0.6,
      company_handle: "TST",
      _token: DATA.tokens.adminToken,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("new test title");
  });

  test("should respond with 401 unaithorized (user)", async () => {
    const response = await request(app).patch("/jobs/1").send({
      title: "new test title",
      salary: 120000,
      equity: 0.6,
      company_handle: "TST",
      _token: DATA.tokens.userToken,
    });

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.text).message).toBe(
      "Unauthorized, admin privileges required"
    );
  });

  test("should return 404 error if no company found", async () => {
    const response = await request(app).patch("/jobs/3").send({
      title: "new test title",
      salary: 120000,
      equity: 0.6,
      company_handle: "TST",
      _token: DATA.tokens.adminToken,
    });

    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE /jobs/:id", async () => {
  test("should delete the specified job (admin)", async () => {
    const response = await request(app).delete(
      `/jobs/1?_token=${DATA.tokens.adminToken}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Successfully deleted ID 1 - test job");
  });

  test("should respond with 401 unauthorized (user)", async () => {
    const response = await request(app).delete(
      `/jobs/1?_token=${DATA.tokens.userToken}`
    );

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.text).message).toBe(
      "Unauthorized, admin privileges required"
    );
  });

  test("returns 404 error if job not found", async () => {
    const response = await request(app).delete(
      `/jobs/3?_token=${DATA.tokens.adminToken}`
    );

    expect(response.statusCode).toBe(404);
  });
});

afterAll(async () => {
  await terminate();
});
