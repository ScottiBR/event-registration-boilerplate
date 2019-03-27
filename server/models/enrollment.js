exports.postUnsubscribeLecture = (connection, res, next, body) => {
  const query_delete = `DELETE FROM inscrito_palestra WHERE INSCRITO_ID = ${
    body.registrationId
  } AND PALESTRA_ID = ${body.lectureId}`;
  connection.query(query_delete, (err, result) => {
    if (err) {
      next(err);
    } else if (result.affectedRows === null) {
      next(`Erro no SQL: ${query_insert}`);
    } else {
      res.json(result.affectedRows);
    }
  });
};

exports.postSubscribeLecture = (connection, res, next, body) => {
  const query_occupation = `select (s.CAPACIDADE-IFNULL(count(i.ID),0)) as avaibleSeats from palestra p 
  join sala s on s.ID = p.SALA_ID
  left join inscrito_palestra i on i.PALESTRA_ID = p.ID
  where p.ID=${body.lectureId}`;
  connection.query(query_occupation, (err, resultSelect) => {
    if (err) {
      next(err);
    } else if (resultSelect === null) {
      next(`Erro no SQL: ${query_occupation}`);
    } else if (resultSelect[0].avaibleSeats < 1) {
      next(`Sem vagas disponíveis`);
    } else {
      const query_insert = `INSERT INTO inscrito_palestra (ID, INSCRITO_ID, PALESTRA_ID) VALUES (NULL, ${
        body.registrationId
      }, ${body.lectureId})`;
      connection.query(query_insert, (err, result) => {
        if (err) {
          next(err);
        } else if (result.insertId === null) {
          next(`Erro no SQL: ${query_insert}`);
        } else {
          res.json(result.insertId);
        }
      });
    }
  });
};

exports.getAllAreas = (connection, res, next) => {
  const query_str = `select ID as id, NOME as name, EVENTO as fullName from area_interesse order by EVENTO ASC`;
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

exports.getLectures = (connection, res, next, registrationID) => {
  const query_str = `
  select 
  p.ID as id,
  a.EVENTO as event,
  a.NOME as area,
  p.TITULO as title,
  p.INICIO as startDate,
  p.FIM as endDate,
  (case IFNULL(i.ID,0) WHEN 0 THEN 0 ELSE 1 END) as subscribed,
  (case IFNULL(x.CHEIA,0) WHEN 0 THEN 0 ELSE 1 END) as full
  from palestra p 
  left join area_interesse a on a.ID = p.AREA_INTERESSE_ID
    left join (select p.ID as ID,1 as CHEIA from palestra p 
  join sala s on s.ID = p.SALA_ID
  left join inscrito_palestra i on i.PALESTRA_ID = p.ID
  group by p.ID,s.CAPACIDADE  HAVING s.CAPACIDADE = count(i.ID)) x on x.ID = p.ID
  left join inscrito_palestra i on i.PALESTRA_ID = p.ID and i.INSCRITO_ID=${registrationID}
  WHERE p.CANCELA_INSCRICAO =0
  ORDER BY a.EVENTO ASC ,p.TITULO ASC`;
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

exports.getEventDetails = (connection, res, next, lectureId) => {
  const query_str = `select 
  p.ID as id,
  a.EVENTO as event,
  a.NOME as area,
  p.TITULO as title,
  p.INICIO as startDate,
  p.FIM as endDate,
  p.DESCRICAO as description
  from palestra p 
  left join area_interesse a on a.ID = p.AREA_INTERESSE_ID 
  WHERE p.ID = ${lectureId}`;
  connection.query(query_str, (err, resultSet) => {
    if (err) {
      next(err);
    } else if (resultSet.length == 0) {
      next(`Palestra Inexistente`);
    } else {
      res.json(resultSet[0]);
    }
  });
};

exports.getEventSpeaker = (connection, res, next, lectureId) => {
  const query_str = `select 
  p.ID as id,
  p.NOME as name,
  p.CARGO as job,
  p.EMPRESA as company,
  p.FOTO as photoFile
  from palestrante p 
  join palestra_palestrantes l on l.PALESTRANTE_ID = p.ID and l.PALESTRA_ID =${lectureId} ORDER BY  p.NOME ASC`;
  connection.query(query_str, (err, resultSet) => {
    if (err) {
      next(err);
    } else if (resultSet.length == 0) {
      res.json(null);
    } else {
      res.json(resultSet);
    }
  });
};
