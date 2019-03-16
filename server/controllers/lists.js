const {
  getPersonByOrgaoId,
  getOrgaoByType,
  getPresidentOrSecretary,
  getEventsByCageId
} = require("../models/lists");

exports.getAllSenators = async (req, res, next) => {
  const ID_PLANALTO_CENTRAL = 49492;
  const COD_JOB_SENADOR = "'SENADOR'";
  try {
    getPersonByOrgaoId(
      req.connection,
      res,
      next,
      ID_PLANALTO_CENTRAL,
      COD_JOB_SENADOR
    );
  } catch (err) {
    next(err);
  }
};
exports.getAllCongressman = async (req, res, next) => {
  const ID_CAMARA = 2343;
  const COD_JOB_DEP_FEDERAL = "'DEPF'";
  try {
    getPersonByOrgaoId(
      req.connection,
      res,
      next,
      ID_CAMARA,
      COD_JOB_DEP_FEDERAL
    );
  } catch (err) {
    next(err);
  }
};
exports.getAllStateCongressman = async (req, res, next) => {
  const ID_ASSEMBLEIA_LEGISLATIVA = 49190;
  const COD_JOB_DEP_ESTADUAL = "'DEPE'";
  try {
    getPersonByOrgaoId(
      req.connection,
      res,
      next,
      ID_ASSEMBLEIA_LEGISLATIVA,
      COD_JOB_DEP_ESTADUAL
    );
  } catch (err) {
    next(err);
  }
};
exports.getPresidentByOrgaoID = async (req, res, next) => {
  const ID_ORGAO = req.params.idOrgao;
  const COD_JOB_PRESIDENT = "'PRES','PRESMICRO'";
  try {
    getPresidentOrSecretary(
      req.connection,
      res,
      next,
      ID_ORGAO,
      COD_JOB_PRESIDENT
    );
  } catch (err) {
    next(err);
  }
};
exports.getSecretaryByOrgaoID = async (req, res, next) => {
  const ID_ORGAO = req.params.idOrgao;
  const COD_JOB_SECRETARY = "'SEMICRO','SECEXEC'";
  try {
    getPresidentOrSecretary(
      req.connection,
      res,
      next,
      ID_ORGAO,
      COD_JOB_SECRETARY
    );
  } catch (err) {
    next(err);
  }
};
exports.getAllMicroregion = async (req, res, next) => {
  const COD_MICROREGION = "'AMR'";
  try {
    getOrgaoByType(req.connection, res, next, COD_MICROREGION);
  } catch (err) {
    next(err);
  }
};
exports.getAllSamu = async (req, res, next) => {
  const COD_SAMU = "'CISAMU'";
  try {
    getOrgaoByType(req.connection, res, next, COD_SAMU);
  } catch (err) {
    next(err);
  }
};
exports.getCongressmanByID = async (req, res, next) => {
  const COD_TYPE_EVENT = "F";
  try {
    getEventsByCageId(req.connection, res, next, req.params.id, COD_TYPE_EVENT);
  } catch (err) {
    next(err);
  }
};
exports.getStateCongressmanByID = async (req, res, next) => {
  const COD_TYPE_EVENT = "E";
  try {
    getEventsByCageId(req.connection, res, next, req.params.id, COD_TYPE_EVENT);
  } catch (err) {
    next(err);
  }
};
