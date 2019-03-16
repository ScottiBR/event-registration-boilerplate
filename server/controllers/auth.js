const jwt = require("jsonwebtoken");
const secretKey = "AMM@2019";
const { testeSelect, authLogin } = require("../models/auth");
exports.get = (req, res, next) => {
  try {
    testeSelect(req, res, next);
  } catch (err) {
    next(err);
  }
};

exports.validateUser = async (req, res, next) => {
  try {
    authLogin(req.connection, res, req.body, next);
  } catch (err) {
    next(err);
  }
};
