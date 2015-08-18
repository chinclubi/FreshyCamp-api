var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// =======================
//

// Write your code here!!!

var tmp = {status: 'ready', message: 'Welcome to Freshy Camp - API' }

app.get('/*', function (req, res) {
  res.json(tmp)
})

//
// =======================

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('API listening at http://%s:%s', host, port)
})
