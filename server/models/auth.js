const md5 = require("md5");
const jwt = require("jsonwebtoken");
const secretKey = "AMM@2019";
exports.testeSelect = (req, res, next) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      next(err);
    } else {
      query_str = "select USU_T_NOME, USU_T_SENHA from sig_usuarios";
      req.connection.query(query_str, (err, data) => {
        if (err) {
          next(err);
        } else {
          res.json(
            data.map(userData => {
              return {
                userName: userData.USU_T_NOME,
                password: userData.USU_T_SENHA
              };
            })
          );
        }
      });
    }
  });
};
/*
 getSuggestionsInitialValues = async () => {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/city/` , {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer' + authToken
      }
    }));
    try {
      const cities = await response.json();
      if (cities.error) {
        this.setState({
          redirect: true
        });
      }
      this.setState({
        suggestionsBase: cities
      });
    } catch (err) {
      console.log(err);
    }
  };

  render(){
     if (this.state.redirect) return <Redirect to={"/signin"} />;
  }
*/
exports.authLogin = (connection, res, user, next) => {
  query_str = `select USU_T_NOME, USU_T_SENHA from sig_usuarios WHERE USU_B_ACESSO_APP =1 AND USU_T_LOGIN ='${
    user.login
  }'`;
  const passwordEncrypted = md5(user.password);
  connection.query(query_str, (err, resultSet) => {
    if (err) {
      next(err);
    } else if (resultSet.length == 0) {
      next("Usuário Inválido");
    } else {
      if (passwordEncrypted === resultSet[0].USU_T_SENHA) {
        jwt.sign({ user }, secretKey, { expiresIn: "3h" }, (err, token) => {
          res.json({
            name: resultSet[0].USU_T_NOME,
            token
          });
        });
      } else {
        next("senha inválida");
      }
    }
  });
};
