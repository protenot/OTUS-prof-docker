const request = require("supertest");
//import express from "express";
import { usersRouter } from "../routes/users.routes";
import { app } from "../index";
//import {User} from "../models/user.entity"
//import { userRepository } from "../repositories/users.repository";
//import { getUser } from "../controllers/users.controllers";
//beforeAll(async () => {
// const rrr=await userRepository.find();
//console.log('rrr', rrr)
//usersRouter.get("/users", getUser);
//});

describe("GET /login", () => {
  it("should return layout", async () => {
    await request(app)
      .get("/login")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200);
  });
});
describe("GET /users", () => {
  it("should return a list of users", async () => {
    /* await userRepository.find({select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },

    order: { name: "ASC" },}); */
    //const app = express();
    app.use(usersRouter);
    console.log("+++++");
    const response = await request(app)
      .get("/users")
      .expect("Content-Type", /json/)
      .expect(200);
    console.log("response", response);
    expect(Array.isArray(response.body)).toBe(true);

    /*  response.body.forEach((user: User) => {
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("name");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("role");
    }); */
  });

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
});
