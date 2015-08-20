var mysql = require('mysql')
var q = require('q')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'freshycamp'
})

connection.connect(function (error) {
  if (!error) {
    console.log('[db] Database is connected ...')
  } else {
    console.log('[db] Error while connecting database ...')
  }
})

module.exports = {
  // ..... export function here
  selectQuery: function (callback) {
    selectSQL(callback)
  }
}

var selectSQL = function (callback) {
  var strQuery = 'SELECT * FROM member WHERE 1'
  connection.query(strQuery, function (error, rows) {
    callback(error, rows)
  })
}
