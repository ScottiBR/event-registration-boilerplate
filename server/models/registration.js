const md5 = require("md5");
exports.getJobs = (connection, res, next) => {
  const query_str = `select CRG_N_CODIGO as id, CRG_T_DESCRICAO as name from sig_ap_cargos order by CRG_T_DESCRICAO ASC`;
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
exports.getCities = (connection, res, next) => {
  const query_str = `select MUN_N_CODIGO AS id, MUN_T_NOME as name from mun_cadastro order by MUN_T_NOME ASC`;
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

exports.postRegistrationForm = (connection, res, next, form) => {
  const query_str = `select ID from inscrito WHERE CPF = ${form.cpf}`;
  connection.query(query_str, (err, resultSet) => {
    if (err) {
      next(err);
    } else if (resultSet.length == 0) {
      const EVENTO_ATUAL = 8;
      const {
        cpf,
        name,
        jobId,
        company,
        phone,
        email,
        password,
        strBirthDay,
        companyType
      } = form;
      const passwordEncrypted = md5(password);
      const query_insert = `INSERT INTO inscrito (ID, CPF, EVENTO_ID, NOME, CARGO_ID, EMPRESA, EMPRESA_TIPO, CELULAR, EMAIL, DATA_INSCRICAO, SENHA, ANIVERSARIO) 
  VALUES (NULL, '${cpf}', ${EVENTO_ATUAL}, '${name}', ${jobId}, '${company}', '${companyType}', '${phone}', '${email}', CURDATE(), '${passwordEncrypted}', '${strBirthDay}');`;
      connection.query(query_insert, (err, result) => {
        if (err) {
          next(err);
        } else if (result.insertId === null) {
          next(`Erro no SQL: ${query_insert}`);
        } else {
          res.json(result.insertId);
        }
      });
    } else {
      res.json(null);
    }
  });
};

exports.postGetUser = (connection, res, next, body) => {
  const { cpf } = body;
  const query_select = `select 
  CPF as cpf,
  NOME as name,
  EMPRESA as company,
  EMPRESA_TIPO as companyType,
  CARGO_ID as jobId,
  EMAIL as email,
  CELULAR as phone,
  DATA_NASCIMENTO as birthDay
  from credenciamento_base WHERE CPF =${cpf}`;
  connection.query(query_select, (err, result) => {
    console.log(result.length === 0);
    if (err) {
      next(err);
    } else if (result.length === 0) {
      res.json(null);
    } else {
      res.json(result[0]);
    }
  });
};
