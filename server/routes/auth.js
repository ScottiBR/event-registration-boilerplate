const express = require("express");
const router = express.Router();
const {
  signin,
  checkCpfAlreadyRegistred,
  signinWithBDay
} = require("../controllers/auth");

router.post("/signin", signin);
router.post("/checkCpfAlreadyRegistred", checkCpfAlreadyRegistred);
router.post("/signinWithBDay", signinWithBDay);
module.exports = app => app.use("/api/auth", router);
