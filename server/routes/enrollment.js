const express = require("express");
const router = express.Router();

module.exports = app => app.use("/api/enrollment", router);
