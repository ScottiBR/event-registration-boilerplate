const {
  getJobs,
  getCities,
  postRegistrationForm,
  postGetUser
} = require("../models/registration");

exports.getJobsRequest = (req, res, next) => {
  try {
    getJobs(req.connection, res, next);
  } catch (err) {
    next(err);
  }
};
exports.getCitiesRequest = async (req, res, next) => {
  try {
    getCities(req.connection, res, next);
  } catch (err) {
    next(err);
  }
};
exports.postRegistrationFormRequest = async (req, res, next) => {
  try {
    postRegistrationForm(req.connection, res, next, req.body);
  } catch (err) {
    next(err);
  }
};

exports.postGetUserRequest = async (req, res, next) => {
  try {
    postGetUser(req.connection, res, next, req.body);
  } catch (err) {
    next(err);
  }
};
