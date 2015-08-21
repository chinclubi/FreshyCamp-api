var mysql = require('mysql')
var q = require('q')

var connection = mysql.createConnection({
  host: '172.17.0.26',
  user: 'admin',
  password: 'lZT7k0tdtA5lI0fV',
  database: 'db'
})

connection.connect(function (error) {
  if (!error) {
    console.log('[db] Database is connected ...')
  } else {
    console.log('[db] Error while connecting database ...')
  }
})

module.exports = {
  selectAll: function (callback) {
    queryAll(callback)
  },

  selectAllIdAndName: function (callback) {
    queryAllIdAndName(callback)
  },

  selectById: function (callback, id) {
    queryById(callback, id)
  },

  checkAttendance: function (callback, id, color) {
    updateAttendance(callback, id, color)
  },

  selectColorById: function (callback, id) {
    queryColorById(callback, id)
  }
}

var queryAll = function (callback) {
  var strQuery = 'SELECT * FROM register'
  connection.query(strQuery, function (error, rows) {
    callback(error, rows)
  })
}

var queryAllIdAndName = function (callback) {
  var strQuery = 'SELECT student_id, name FROM register'
  connection.query(strQuery, function (error, rows) {
    callback(error, rows)
  })
}

var queryById = function (callback, id) {
  var strQuery = 'SELECT * FROM register WHERE student_id = ' + id
  connection.query(strQuery, function (error, rows) {
    callback(error, rows)
  })
}

var updateAttendance = function (callback, id, color) {
  var strQuery = "UPDATE register SET attendance = '1', color = '" + color + "' WHERE student_id = '" + id + "'"
  connection.query(strQuery, function (error) {
    if (!error) {
      queryColorById(callback, id)
    }
  })
}

var queryColorById = function (callback, id) {
  var strQuery = 'SELECT color FROM register WHERE student_id = ' + id
  connection.query(strQuery, function (error, rows) {
    callback(error, rows)
  })
}
