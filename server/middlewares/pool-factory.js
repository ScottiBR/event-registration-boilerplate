const mysql = require("mysql");
const connectionLimit = 5;
const pool = mysql.createPool({
  connectionLimit,
  host: "localhost",
  user: "dejore_gestor",
  password: "m@Cz5d59",
  database: "gestor",
  timezone: "UTC",
  dateStrings: ["DATE", "DATETIME"]
});

pool.on("connection", conn => {
  conn.query("SET time_zone='-03:00';", error => {
    if (error) {
      throw error;
    }
  });
});
//console.log("pool => criado");

//pool.on("release", () => console.log("pool => conexão retornada"));

process.on("SIGINT", () =>
  pool.end(err => {
    if (err) return console.log(err);
    console.log("pool => fechado");
    process.exit(0);
  })
);

module.exports = pool;
