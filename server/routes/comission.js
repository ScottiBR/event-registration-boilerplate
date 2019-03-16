const express = require("express");
const router = express.Router();
const controller = require("../controllers/comission");

router.get("/list", controller.getAllComissions);
router.get("/members/:id", controller.getComissionMembers);
router.get("/projects/:id", controller.getComissionProjets);
module.exports = app => app.use("/api/comission", router);
