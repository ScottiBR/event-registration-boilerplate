const {
  getComissions,
  getMembers,
  getProjects
} = require("../models/comission");

exports.getAllComissions = async (req, res, next) => {
  try {
    getComissions(req.connection, res, next);
  } catch (err) {
    next(err);
  }
};
exports.getComissionMembers = async (req, res, next) => {
  try {
    getMembers(req.connection, res, next, req.params.id);
  } catch (err) {
    next(err);
  }
};
exports.getComissionProjets = async (req, res, next) => {
  try {
    getProjects(req.connection, res, next, req.params.id);
  } catch (err) {
    next(err);
  }
};
