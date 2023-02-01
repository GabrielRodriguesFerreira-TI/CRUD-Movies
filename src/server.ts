import express, { Application, json } from "express";
import { client } from "./database";
import { createMovie, deleteMovie, getAllMovies, updateMovie } from "./logic";
import { verifyIdExists } from "./middlewares/verifyId";

const server: Application = express();
server.use(json());
server.use("/movies/:id", verifyIdExists);

server.post("/movies", createMovie);
server.get("/movies", getAllMovies);
server.patch("/movies/:id", updateMovie);
server.delete("/movies/:id", deleteMovie);

const runningMsg: string = "Server running on port http://localhost:3000";
server.listen(3000, () => {
  client.connect();
  console.log(runningMsg);
});
