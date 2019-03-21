const {
  checkCpfAlreadyRegistredInDatabase,
  signinWithBdayAndRegistration,
  signinWithLoginAndPassword
} = require("../models/auth");
exports.signin = (req, res, next) => {
  try {
    signinWithLoginAndPassword(req.connection, res, req.body, next);
  } catch (err) {
    next(err);
  }
};

exports.checkCpfAlreadyRegistred = async (req, res, next) => {
  try {
    checkCpfAlreadyRegistredInDatabase(req.connection, res, req.body, next);
  } catch (err) {
    next(err);
  }
};

exports.signinWithBDay = async (req, res, next) => {
  try {
    signinWithBdayAndRegistration(req.connection, res, req.body, next);
  } catch (err) {
    next(err);
  }
};
