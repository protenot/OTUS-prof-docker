import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/user.entity";
import { Task } from "../models/task.entity";
import { Comment } from "../models/comment.entity";
import 'dotenv/config';

export const myDataSource = new DataSource({
  type: "postgres",
  host:  `${process.env.DB_HOST}`,
  port: 5432,
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  entities: [User, Task, Comment],
  synchronize: true,
  logging: false,
  migrations: ["./migrations/*.ts"],

  migrationsTableName: "migrations",
});

myDataSource.initialize();
