const mysql = require("mysql");

import config from "../config";
let connection = mysql.createConnection({
  ...config,
});
connection.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server.");
});

let createTodos = `create table if not exists todos(
    id int primary key auto_increment,
    title varchar(255) not null,
    completed tinyint(1) not null default 0
)`;

connection.query(createTodos, function (error, results, fields) {
  if (error) throw error;
});

connection.query("SELECT * FROM todos", (error, results, fields) => {
  console.log(results);
});

connection.query(
  "INSERT INTO todos set ?",
  { title: "幻塔牛逼", completed: 1 },
  (error, result) => {
    if (error) {
      console.log(error.message);
    }
  }
);
