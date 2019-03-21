const express = require("express");
const router = express.Router();
const controller = require("../controllers/comission");

module.exports = app => app.use("/api/enrollment", router);
