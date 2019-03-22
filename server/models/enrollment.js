exports.getComissions = (connection, res, next) => {
  const query_str = `SELECT ID AS id, NOME AS name FROM comissoes ORDER BY NOME ASC`;
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

exports.getMembers = (connection, res, next, idComission) => {
  const query_str = `
  select cg.ID as "id" ,
  cg.nickName as "name",
  c.CARGO as "nickName",
    cg.party as "party",
    c.CARGO as "job" ,
    cg.phone as "phone",
    cg.facebook as "facebook",
    cg.instagram as "instagram",
    cg.photoFile as "photoFile"
  from comissao_membros c
  join view_appPersonByOrgaoID cg on cg.id =c.CAGE_N_CODIGO and cg.idOrgao = 49190 and cg.job ='DEPE'
  where c.COMISSAO_ID =${idComission}`;
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
exports.getProjects = (connection, res, next, idComission) => {
  const query_str = `
  select p.id as "id",
    p.NOME as "description",
    c.nickName as "manager",
    p.RESUMO as "summary",
    p.ANALISE as "review",
    p.SUGESTAO as "suggestion",
    p.PRESENTE as "presence"
  from projetos p
  join view_appPersonByOrgaoID c on c.id = p.CAGE_N_CODIGO and job ='DEPE'
  WHERE COMISSAO_ID =${idComission}`;
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
