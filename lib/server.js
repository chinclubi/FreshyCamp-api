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
    mysql.getColors(function(error, result) {
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
    mysql.getAllById(function (error, result) {
        if (result[0].color == null) {

            var color = random.generateColor(result[0].gender, result[0].branch);

            mysql.checkAttendance(function (error, result) {
                if (!error) {
                    response.json(result)
                }
            }, id, color)
        } else {
            response.json(result)
        }
    }, id)
})

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('API listening at http://%s:%s', host, port)
})
