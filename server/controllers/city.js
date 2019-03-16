const {
  getCityHall,
  getMayor,
  getCities,
  getCertificatesIssued,
  getCustomerServicesRealized,
  getExternalEvents
} = require("../models/city");

exports.getAllCities = (req, res, next) => {
  try {
    getCities(req.connection, res, next, req.params.id);
  } catch (err) {
    next(err);
  }
};
exports.getCityHallById = async (req, res, next) => {
  try {
    getCityHall(req.connection, res, next, req.params.id);
  } catch (err) {
    next(err);
  }
};
exports.getMayorByCityId = async (req, res, next) => {
  try {
    getMayor(req.connection, res, next, req.params.id);
  } catch (err) {
    next(err);
  }
};
exports.getExternalEventsById = async (req, res, next) => {
  try {
    getExternalEvents(req.connection, res, next, req.params.id);
  } catch (err) {
    next(err);
  }
};
exports.getCustomerServicesRealizedById = async (req, res, next) => {
  try {
    getCustomerServicesRealized(req.connection, res, next, req.params.id);
  } catch (err) {
    next(err);
  }
};
exports.getCertificatesIssuedById = async (req, res, next) => {
  try {
    getCertificatesIssued(req.connection, res, next, req.params.id);
  } catch (err) {
    next(err);
  }
};
