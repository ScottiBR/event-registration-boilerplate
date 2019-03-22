const express = require("express");
const router = express.Router();
const {
  postRegistrationFormRequest,
  getJobsRequest,
  getCitiesRequest,
  postGetUserRequest
} = require("../controllers/registration");

router.post("/postRegistrationFormRequest", postRegistrationFormRequest);
router.post("/postGetUserRequest", postGetUserRequest);
router.get("/getJobsRequest", getJobsRequest);
router.get("/getCitiesRequest", getCitiesRequest);

module.exports = app => app.use("/api/registration", router);
