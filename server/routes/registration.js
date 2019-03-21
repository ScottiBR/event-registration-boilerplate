const express = require("express");
const router = express.Router();
const controller = require("../controllers/city");

module.exports = app => app.use("/api/registration", router);
