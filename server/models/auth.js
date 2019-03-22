const md5 = require("md5");
const jwt = require("jsonwebtoken");
const secretKey = "AMM@2019";

exports.checkCpfAlreadyRegistredInDatabase = (connection, res, body, next) => {
  const query_str = `select ID as registrationID from inscrito WHERE CPF = ${
    body.cpf
  }`;
  connection.query(query_str, (err, resultSet) => {
    if (err) {
      next(err);
    } else if (resultSet.length == 0) {
      res.json(null);
    } else {
      res.json(resultSet[0].registrationID);
    }
  });
};
exports.signinWithBdayAndRegistration = (connection, res, body, next) => {
  const query_str = `select CPF  from inscrito WHERE ID = ${
    body.registrationID
  } AND ANIVERSARIO='${body.strBirthDay}' `;
  console.log(query_str);
  connection.query(query_str, (err, resultSet) => {
    if (err) {
      next(err);
    } else if (resultSet.length == 0) {
      res.json({ error: "Data de Nascimento Incorreta" });
    } else {
      res.json(resultSet[0]);
    }
  });
};

exports.signinWithLoginAndPassword = (connection, res, user, next) => {
  const passwordEncrypted = md5(user.password);
  const query_str = `select CPF from inscrito WHERE ID = ${
    user.registrationID
  } AND SENHA='${passwordEncrypted}' `;
  connection.query(query_str, (err, resultSet) => {
    if (err) {
      next(err);
    } else if (resultSet.length == 0) {
      res.json({ error: "Senha Incorreta" });
    } else {
      res.json(resultSet[0]);
    }
  });
};
