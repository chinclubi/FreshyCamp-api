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
  getAll: function (callback) {
    selectAll(callback)
  },

  getIdAndName: function (callback) {
    selectIdAndName(callback)
  },

  getAllById: function (callback, id) {
    selectAllById(callback, id)
  },

  checkAttendance: function (callback, id, color) {
    updateAttendance(callback, id, color)
  },

  getColors: function (callback) {
    selectColors(callback)
  },

  getColorByColorId: function (callback, id) {
    selectColorByColorId(callback, id)
  }
}

var selectAll = function (callback) {
  var strQuery = 'SELECT * FROM register'
  connection.query(strQuery, function (error, rows) {
    callback(error, rows)
  })
}

var selectIdAndName = function (callback) {
  var strQuery = 'SELECT student_id, name FROM register'
  connection.query(strQuery, function (error, rows) {
    callback(error, rows)
  })
}

var selectAllById = function (callback, id) {
  var strQuery = 'SELECT * FROM register WHERE student_id = ' + id
  connection.query(strQuery, function (error, rows) {
    callback(error, rows)
  })
}

var updateAttendance = function (callback, id, color) {
  var strQuery = "UPDATE register SET attendance = '1', color = '" + color + "' WHERE student_id = '" + id + "'"
  connection.query(strQuery, function (error) {
    if (!error) {
      selectColorById(callback, id)
    }
  })
}

var selectColorById = function (callback, id) {
  var strQuery = 'SELECT color FROM register WHERE student_id = ' + id
  connection.query(strQuery, function (error, rows) {
    callback(error, rows)
  })
}

var selectColors = function (callback) {
  var strQuery = 'SELECT * FROM color'
  connection.query(strQuery, function (error, rows) {
    callback(error, rows)
  })
}

var selectColorByColorId = function (callback, id) {
  var strQuery = "SELECT * FROM color WHERE color_id = '" + id + "'"
  connection.query(strQuery, function (error, rows) {
    callback(error, rows)
  })
}
