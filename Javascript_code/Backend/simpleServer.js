//import libs
const EXPRESS = require("express");
const APP = EXPRESS();
const BODYPARSER = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();
const { createServer } = require("http");
const PORT = 8010;
const corsConfig = {
  origin: true,
  credentials: true,
};

//config
APP.use(cors(corsConfig));
APP.options("*", cors(corsConfig));
APP.use(EXPRESS.static("public"));
APP.use(BODYPARSER.urlencoded({ extended: true }));
APP.use(BODYPARSER.json());
APP.use(EXPRESS.json());

const httpServer = createServer(APP);

//database
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

//api
APP.get("/inputButt", (req, res) => {
  var sql = "SELECT input FROM " + table_name;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result[0].input);
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

APP.get("/inputButt/refresh", (req, res) => {
  let input = ""
  var sql = "UPDATE inputButt SET input = ?, atTime = CURTIME() WHERE id = 1";
  con.query(sql, [input], (err, response) => {
    if (err) throw err;
    res.json({ message: "Refresh input success!" });
  });
});

APP.get("/evangelion", (req, res) => {
  var sql = "SELECT * FROM Evangelion";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

APP.get("/jojopart2", (req,res) => {
  var sql = "SELECT * FROM Jojopart2";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})


httpServer.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
