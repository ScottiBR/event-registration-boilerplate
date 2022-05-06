const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const pool = require("./middlewares/pool-factory");
const connectionMiddleware = require("./middlewares/connection-middleware");
const buildPath = path.join(__dirname, "../build");
const cors = require("cors");
const app = express();
var whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://inscricaoonline.amm-mg.org.br"
];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} Acesso negado!`));
    }
  }
};
app.use(logger("tiny"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(buildPath));
app.use(connectionMiddleware(pool));

require("./routes/auth")(app);
require("./routes/registration")(app);
require("./routes/enrollment")(app);
//default redirection for React SPA Routed Apllication
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.toString() });
});

module.exports = app;
