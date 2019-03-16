const jwt = require("jsonwebtoken");
const secretKey = "AMM@2019";
exports.getCities = (connection, res, next, idCity) => {
  const query_str = `SELECT MUN_N_CODIGO AS 'id', MUN_T_NOME AS 'city', MUN_T_NOME_S_ACENTO AS 'cityFormated' FROM mun_cadastro`;
  connection.query(query_str, (err, resultSet) => {
    if (err) {
      next(err);
    } else if (resultSet.length == 0) {
      next(`Erro no SQL: ${query_str}`);
    } else {
      res.json(resultSet);
    }
  });
};
exports.getCityHall = (connection, res, next, id) => {
  const query_str = `SELECT * FROM view_appcityhall WHERE id =${id}`;
  connection.query(query_str, (err, resultSet) => {
    if (err) {
      next(err);
    } else if (resultSet.length == 0) {
      res.json(null);
    } else {
      res.json(resultSet[0]);
    }
  });
};

exports.getMayor = (connection, res, next, idCity) => {
  const query_str = `SELECT * FROM view_appmayor WHERE idCity =${idCity}`;
  connection.query(query_str, (err, resultSet) => {
    if (err) {
      next(err);
    } else if (resultSet.length == 0) {
      next("ID do Município Inválido");
    } else {
      res.json(resultSet[0]);
    }
  });
};

exports.getExternalEvents = (connection, res, next, idCity) => {
  let query_str = `SELECT cpf FROM view_appmayor WHERE idCity =${idCity}`;
  connection.query(query_str, (err, resultSet) => {
    if (err) {
      next(err);
    } else if (resultSet.length == 0) {
      next("ID do Município Inválido");
    } else {
      const CPF = resultSet[0].cpf;
      query_str = `select e.ID as "id", t.NOME as "type",e.TITULO as "name",e.LOCAL as "location",DATE(e.INICIO) as "date",IFNULL(a.PARTICIPOU,0) as "presence"
  from evento_externo e 
  join tipo_evento_externo t on t.ID =e.TIPO_EVENTO_EXTERNO_ID and TIPO_PARTICIPANTES ='P'
  left join (SELECT IFNULL(PARTICIPOU,0) as PARTICIPOU ,EVENTO_EXTERNO_ID from evento_externo_participantes WHERE  CPF=${CPF}) a on e.ID = a.EVENTO_EXTERNO_ID
  order by DATE(e.INICIO) DESC`;
      connection.query(query_str, (err, resultSet) => {
        if (err) {
          next(err);
        } else if (resultSet.length == 0) {
          next("CPF Inválido");
        } else {
          res.json(resultSet);
        }
      });
    }
  });
};

exports.getCustomerServicesRealized = (connection, res, next, idCity) => {
  const query_str = `SELECT * FROM view_appCustomerServicesRealized WHERE idMun =${idCity}`;
  connection.query(query_str, (err, resultSet) => {
    if (err) {
      next(err);
    } else if (resultSet.length == 0) {
      next("ID do Município Inválido");
    } else {
      res.json(resultSet);
    }
  });
};

exports.getCertificatesIssued = (connection, res, next, idCity) => {
  let query_str = `SELECT cpf FROM view_appmayor WHERE idCity =${idCity}`;
  connection.query(query_str, (err, resultSet) => {
    if (err) {
      next(err);
    } else if (resultSet.length == 0) {
      next("ID do Município Inválido");
    } else {
      const CPF = resultSet[0].cpf;
      query_str = `SELECT
      ID as "id",
      IFNULL(DATA_EVENTO,DATA) as "date",
      (CASE LOCAL 
        WHEN "S" THEN "SEDE" 
        ELSE "ESPAÇO AMM"  END) as "location",
      (case EVENTO WHEN NULL THEN "Presença" ELSE "Evento" END) as "type"
       FROM comparecimento WHERE CPF=${CPF} order by id DESC`;
      connection.query(query_str, (err, resultSet) => {
        if (err) {
          next(err);
        } else if (resultSet.length == 0) {
          res.json(resultSet);
        } else {
          res.json(resultSet);
        }
      });
    }
  });
};
