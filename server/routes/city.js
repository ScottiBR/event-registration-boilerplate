const express = require("express");
const router = express.Router();
const controller = require("../controllers/city");

router.get("/", controller.getAllCities);
router.get("/cityHall/:id", controller.getCityHallById);
router.get("/mayor/:id", controller.getMayorByCityId);
router.get("/externalEvents/:id", controller.getExternalEventsById);
router.get(
  "/customerServicesRealized/:id",
  controller.getCustomerServicesRealizedById
);
router.get("/certificatesIssued/:id", controller.getCertificatesIssuedById);

module.exports = app => app.use("/api/city", router);
