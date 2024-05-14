const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.MYSQL_SQL_IP,
  port: process.env.MYSQL_SQL_PORT,
  user: process.env.MYSQL_SQL_USERNAME,
  password: process.env.MYSQL_SQL_PASSWORD,
  database: 'UNIFICADO_METRO'
});
connection.connect((err) => {
  if (err) throw err;
});

module.exports = connection;