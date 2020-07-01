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

describe("POST /companies", async () => {
  test("should create a new company (admin)", async () => {
    const response = await request(app).post("/companies").send({
      handle: "NEW",
      name: "New Company Corp.",
      num_employees: 228,
      _token: DATA.tokens.adminToken,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.company).toHaveProperty("handle");
  });

  test("should not create a new company (user)", async () => {
    const response = await request(app).post("/companies").send({
      handle: "NEW",
      name: "New Company Corp.",
      num_employees: 228,
      _token: DATA.tokens.userToken,
    });

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.text).message).toBe(
      "Unauthorized, admin privileges required"
    );
  });

  test("should not create duplicate company (admin)", async () => {
    const response = await request(app).post("/companies").send({
      handle: "TST",
      name: "Test Inc.",
      num_employees: 100,
      _token: DATA.tokens.adminToken,
    });

    expect(response.statusCode).toBe(500);
  });
});

describe("GET /companies", async () => {
  test("should get all companies (authenticated)", async () => {
    const response = await request(app).get(
      `/companies/?_token=${DATA.tokens.userToken}`
    );

    expect(response.body.companies).toHaveLength(2);
  });

  test("should respond with 401 unauthorized (not authenticated)", async () => {
    const response = await request(app).get("/companies");

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.text).message).toBe("Unauthorized");
  });
});

describe("GET /companies/:handle", async () => {
  test("should get 1 company", async () => {
    const response = await request(app).get(
      `/companies/TST?_token=${DATA.tokens.userToken}`
    );

    expect(response.body.company.name).toBe("Test Inc.");
    expect(response.body.company.jobs).toHaveLength(1);
  });

  test("should respond with 401 unauthorized (not authenticated)", async () => {
    const response = await request(app).get("/companies/TST");

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.text).message).toBe("Unauthorized");
  });

  test("should respond with 404 if no company found", async () => {
    const response = await request(app).get(
      `/companies/Nonexistent?_token=${DATA.tokens.userToken}`
    );

    expect(response.statusCode).toBe(404);
  });
});

describe("PATCH /companies/:handle", async () => {
  test("should update the company's information (admin)", async () => {
    const response = await request(app).patch("/companies/TST").send({
      handle: "NEW",
      name: "New Company",
      num_employees: 1,
      description: "New Desc",
      logo_url: "https://random.org/2.jpg",
      _token: DATA.tokens.adminToken,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.company.name).toBe("New Company");
    expect(response.body.company.num_employees).toBe(1);
    expect(response.body.company.description).toBe("New Desc");
    expect(response.body.company.logo_url).toBe("https://random.org/2.jpg");
  });

  test("should respond with 401 unaithorized (user)", async () => {
    const response = await request(app).patch("/companies/TST").send({
      handle: "NEW",
      name: "New Company",
      num_employees: 1,
      description: "New Desc",
      logo_url: "https://random.org/2.jpg",
      _token: DATA.tokens.userToken,
    });

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.text).message).toBe(
      "Unauthorized, admin privileges required"
    );
  });

  test("should return 404 error if no company found", async () => {
    const response = await request(app).patch("/companies/nonexistent").send({
      handle: "NEW",
      name: "New Company",
      num_employees: 1,
      description: "New Desc",
      logo_url: "https://random.org/2.jpg",
      _token: DATA.tokens.adminToken,
    });

    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE /companies/:handle", async () => {
  test("should delete the specified company (admin)", async () => {
    const response = await request(app).delete(
      `/companies/TST?_token=${DATA.tokens.adminToken}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("successfully deleted TST");
  });

  test("should respond with 401 unauthorized (user)", async () => {
    const response = await request(app).delete(
      `/companies/TST?_token=${DATA.tokens.userToken}`
    );

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.text).message).toBe(
      "Unauthorized, admin privileges required"
    );
  });

  test("returns 404 error if company not found", async () => {
    const response = await request(app).delete(
      `/companies/nonexistent?_token=${DATA.tokens.adminToken}`
    );

    expect(response.statusCode).toBe(404);
  });
});

afterAll(async () => {
  await terminate();
});
