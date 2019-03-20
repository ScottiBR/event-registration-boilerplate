const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const pool = require("./server/middlewares/pool-factory");
const connectionMiddleware = require("./server/middlewares/connection-middleware");
const buildPath = path.join(__dirname, "build");
const app = express();

app.use(logger("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(buildPath));
app.use(connectionMiddleware(pool));

//default redirection for React SPA Routed Apllication
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.toString() });
});

module.exports = app;
