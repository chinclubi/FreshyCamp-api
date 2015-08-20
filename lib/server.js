var express = require('express')
var bodyParser = require('body-parser')
var mysql = require('./mysql/mysql')

var app = express()

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// =======================
//

// Write your code here!!!

app.get('/*', function (req, res) {
  mysql.selectQuery(function (error, result) {
    res.json(result)
  })
})

//
// =======================

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('API listening at http://%s:%s', host, port)
})
