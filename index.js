require("dotenv").config();
// const jwt = require("jsonwebtoken");
const { PORT = 4000 } = process.env;
const express = require("express");
const server = express();
const path = require("path");

const { client } = require("./db");
client.connect();

const morgan = require("morgan");
server.use(morgan("dev"));

server.use(express.json());

const apiRouter = require("./api");
server.use("/api", apiRouter);

server.use(express.static(path.join(__dirname, "client", "build")));
server.get("*", (req, res, next) =>
  res.sendFile(path.join(__dirname, "client", "build", "index.html"))
);

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
