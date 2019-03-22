const {
  postUnsubscribeLecture,
  postSubscribeLecture,
  getAllAreas,
  getLectures,
  getEventDetails,
  getEventSpeaker
} = require("../models/enrollment");

exports.postUnsubscribeLectureRequest = async (req, res, next) => {
  try {
    postUnsubscribeLecture(req.connection, res, next, req.body);
  } catch (err) {
    next(err);
  }
};
exports.postSubscribeLectureRequest = async (req, res, next) => {
  try {
    postSubscribeLecture(req.connection, res, next, req.body);
  } catch (err) {
    next(err);
  }
};
exports.getAllAreasRequest = async (req, res, next) => {
  try {
    getAllAreas(req.connection, res, next);
  } catch (err) {
    next(err);
  }
};
exports.getLecturesRequest = async (req, res, next) => {
  try {
    getLectures(req.connection, res, next, req.params.id);
  } catch (err) {
    next(err);
  }
};
exports.getEventDetailsRequest = async (req, res, next) => {
  try {
    getEventDetails(req.connection, res, next, req.params.id);
  } catch (err) {
    next(err);
  }
};
exports.getEventSpeakerRequest = async (req, res, next) => {
  try {
    getEventSpeaker(req.connection, res, next, req.params.id);
  } catch (err) {
    next(err);
  }
};
