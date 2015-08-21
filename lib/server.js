var express = require('express')
var bodyParser = require('body-parser')
var mysql = require('./mysql/mysql')
var random = require('./random')

var app = express()

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json())

app.get('/', function (request, response) {
  mysql.getAll(function (error, result) {
    response.json(result)
  })
})

app.get('/color', function (request, response) {
  mysql.getColors(function (error, result) {
    response.json(result)
  })
})

app.get('/all', function (request, response) {
  mysql.getIdAndName(function (error, result) {
    response.json(result)
  })
})

app.get('/random', function (request, response) {
  mysql.getColors(function (error, result) {
    response.json(random.generateColor(result, 'M', 'CPE'))
  })
})

app.get('/slot', function (request, response) {
  response.json(random.getSlot())
})

app.get('/:id', function (request, response) {
  mysql.getAllById(function (error, result) {
    response.json(result)
  }, request.params.id)
})

app.post('/register', function (request, response) {
  var id = request.body.id
  var p
  mysql.getAllById(function (error, result) {
    p = result[0]
    if (result[0].color == null) {
      mysql.getColors(function (error, result) {
        random.generateColor(result, p.gender, p.branch).then(function (color) {
          console.log('generate color: ')
          console.log(color)
          mysql.checkAttendance(function (error, result) {
            if (!error) {
              console.log('check attendance result:' + result)
              // var color_id = result
              mysql.getColorByColorId(function (error, result) {
                response.json(result)
              }, result[0].color)
            }
          }, id, color.color)
        })
      })
    } else {
      console.log('already register')
      mysql.getColorByColorId(function (error, result) {
        response.json(result)
      }, result[0].color)
    }
  }, id)
})

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('API listening at http://%s:%s', host, port)
})
