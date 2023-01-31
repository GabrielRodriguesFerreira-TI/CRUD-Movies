import express, { Application, json } from "express";

const server: Application = express();
server.use(json());

const runningMsg: string = "Server running on port http://localhost:3000";
server.listen(3000, () => console.log(runningMsg));
