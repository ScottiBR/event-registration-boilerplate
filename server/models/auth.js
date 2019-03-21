const md5 = require("md5");
const jwt = require("jsonwebtoken");
const secretKey = "AMM@2019";

exports.checkCpfAlreadyRegistredInDatabase = (connection, res, body, next) => {
  query_str = `select ID from inscrito WHERE CPF = ${body.cpf}`;
  console.log(query_str);
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
exports.signinWithBdayAndRegistration = (connection, res, body, next) => {
  query_str = `select ID from inscrito WHERE ID = ${
    body.registrationId
  } AND ANIVERSARIO=\"${body.birthDay}\" `;
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
  query_str = `select ID from inscrito WHERE ID = ${
    user.registrationId
  } AND SENHA=\"${passwordEncrypted}\" `;

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
