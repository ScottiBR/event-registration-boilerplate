const express = require("express");
const router = express.Router();
const {
  postUnsubscribeLectureRequest,
  postSubscribeLectureRequest,
  getAllAreasRequest,
  getLecturesRequest,
  getEventDetailsRequest,
  getEventSpeakerRequest
} = require("../controllers/enrollment");

router.delete("/postUnsubscribeLectureRequest", postUnsubscribeLectureRequest);
router.post("/postSubscribeLectureRequest", postSubscribeLectureRequest);
router.get("/getAllAreasRequest", getAllAreasRequest);
router.get("/getLecturesRequest/:id", getLecturesRequest);
router.get("/getEventDetailsRequest/:id", getEventDetailsRequest);
router.get("/getEventSpeakerRequest/:id", getEventSpeakerRequest);
module.exports = app => app.use("/api/enrollment", router);
