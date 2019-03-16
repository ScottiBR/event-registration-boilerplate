const express = require("express");
const router = express.Router();
const controller = require("../controllers/lists");

router.get("/congressman", controller.getAllCongressman);
router.get("/stateCongressman", controller.getAllStateCongressman);
router.get("/senators", controller.getAllSenators);
router.get("/microregion", controller.getAllMicroregion);
router.get("/samu", controller.getAllSamu);
router.get("/secretary/:idOrgao", controller.getSecretaryByOrgaoID);
router.get("/president/:idOrgao", controller.getPresidentByOrgaoID);
router.get("/congressman/events/:id", controller.getCongressmanByID);
router.get("/stateCongressman/events/:id", controller.getStateCongressmanByID);
module.exports = app => app.use("/api/lists", router);
