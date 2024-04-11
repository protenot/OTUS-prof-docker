import supertest from "supertest";
//import { usersRouter } from "../routes/users.routes";
import { app } from "../index";
import { myDataSource } from "../config/dataSource";

beforeAll(async () => {

myDataSource.initialize()
});

describe("GET /login", () => {
  it("should return layout", async () => {
    await supertest(app)
      .get("/login")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200);
  });
});

// не получается у меня тестов с использоввнием базы, может нужен другой подход
//
/* describe("GET /users", () => {
  it("should return a list of users", async () => {
    
    app.use(usersRouter);
    console.log("+++++");
    const response = await supertest(app)
      .get("/users")
      .expect("Content-Type", /json/)
      .expect(200);
    console.log("response", response);
    expect(Array.isArray(response.body)).toBe(true); */

    /*  response.body.forEach((user: User) => {
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("name");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("role");
    }); */
  //});

  /*  it("should return status 500 if an error occurs", async () => {
    jest.mock("../datasource", () => ({
      myDataSource2Pg: {
        getRepository: jest.fn(() => {
          throw new Error("Test error");
        }),
      },
    }));

    const response = await request(app)
      .get("/users")
      .expect("Content-Type", /json/)
      .expect(500);

    expect(response.body).toEqual({ error: "Failed to fetch comments" });
  }); */
//});
