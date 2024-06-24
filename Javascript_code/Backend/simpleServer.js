const EXPRESS = require("express");
const APP = EXPRESS();
const BODYPARSER = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").load;
const PORT = process.env.PORT || 8010;
const corsConfig = {
  origin: true,
  credentials: true,
};

APP.use(cors(corsConfig));
APP.options("*", cors(corsConfig));
APP.use(EXPRESS.static("public"));
APP.use(BODYPARSER.urlencoded({ extended: true }));
APP.use(BODYPARSER.json());
APP.use(EXPRESS.json());

const password = "danghomp69";
const database = "game_iot";
const table_name = "inputButt";

var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: password,
  insecureAuth: true,
  database: database,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected Database!!!");
});

APP.get("/inputButt", (req, res) => {
  var sql = "SELECT * FROM " + table_name;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

APP.post("/inputButt", (req, res) => {
  let input = req.body.input;
  let sql =
    "UPDATE " + table_name + " SET input = ?, atTime = CURTIME() WHERE id = 1";
  con.query(sql, [input], (err, response) => {
    if (err) throw err;
    res.json({ message: "Update success!" });
  });
});

APP.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});