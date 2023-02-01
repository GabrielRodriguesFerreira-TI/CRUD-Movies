import { Client } from "pg";
import { iMovies } from "./interfaces/tables";

export const client = new Client({
  user: "Gabriel",
  password: "a02310440a",
  host: "localhost",
  database: "movies",
  port: 5432,
});

export const movies: iMovies[] = [];
