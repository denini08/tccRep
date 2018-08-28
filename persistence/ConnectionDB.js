const mysql = require('mysql');

let mySqlConn = null;

(() => {
  mySqlConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tcc',
  }, { multipleStatements: true });
})();

module.exports = mySqlConn;
  