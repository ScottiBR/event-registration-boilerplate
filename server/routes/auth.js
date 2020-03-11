const express = require("express");
const router = express.Router();
const {
  signin,
  checkCpfAlreadyRegistred,
  signinWithBDay,
  getEventConfig
} = require("../controllers/auth");

router.get("/getEventConfig", getEventConfig);
router.post("/signin", signin);
router.post("/checkCpfAlreadyRegistred", checkCpfAlreadyRegistred);
router.post("/signinWithBDay", signinWithBDay);
module.exports = app => app.use("/api/auth", router);
