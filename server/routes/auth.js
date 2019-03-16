const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");
const { verifyToken } = require("../middlewares/index");

router.get("/teste", verifyToken, controller.get);
router.post("/validateLogin", controller.validateUser);

module.exports = app => app.use("/api/auth", router);
