exports.getPersonByOrgaoId = (connection, res, next, idOrgao, job) => {
  const query_str = `SELECT * FROM view_appPersonByOrgaoID WHERE idOrgao =${idOrgao} and job in(${job}) order by name asc`;
  connection.query(query_str, (err, resultSet) => {
    if (err) {
      next(err);
    } else if (resultSet.length == 0) {
      res.json(resultSet);
    } else {
      res.json(resultSet);
    }
  });
};
exports.getPresidentOrSecretary = (connection, res, next, idOrgao, job) => {
  const query_str = `SELECT * FROM view_appPersonByOrgaoID WHERE idOrgao =${idOrgao} and job in(${job}) order by name asc`;
  connection.query(query_str, (err, resultSet) => {
    if (err) {
      next(err);
    } else if (resultSet.length == 0) {
      res.json(resultSet);
    } else {
      res.json(resultSet[0]);
    }
  });
};
exports.getOrgaoByType = (connection, res, next, typeOrgao) => {
  const query_str = `SELECT * FROM view_appOrgaoByType WHERE type in(${typeOrgao})  order by name asc`;
  connection.query(query_str, (err, resultSet) => {
    if (err) {
      next(err);
    } else if (resultSet.length == 0) {
      res.json(resultSet);
    } else {
      res.json(resultSet);
    }
  });
};

exports.getEventsByCageId = (connection, res, next, id, typeEvent) => {
  const query_str = `select e.ID as "id", t.NOME as "type",e.TITULO as "name",e.LOCAL as "location",DATE(e.INICIO) as "date",IFNULL(a.PARTICIPOU,0) as "presence"
  from evento_externo e 
  join tipo_evento_externo t on t.ID =e.TIPO_EVENTO_EXTERNO_ID and TIPO_PARTICIPANTES ='${typeEvent}'
  left join (SELECT IFNULL(PARTICIPOU,0) as PARTICIPOU ,EVENTO_EXTERNO_ID from evento_externo_participantes WHERE  CAGE_N_CODIGO=${id}) a on e.ID = a.EVENTO_EXTERNO_ID
  order by DATE(e.INICIO) DESC`;
  connection.query(query_str, (err, resultSet) => {
    if (err) {
      next(err);
    } else {
      res.json(resultSet);
    }
  });
};
