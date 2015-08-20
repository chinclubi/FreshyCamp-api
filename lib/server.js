var express = require('express')
var bodyParser = require('body-parser')
var mysql = require('./mysql/mysql')
var random = require('./random')

var app = express()

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.get('/all', function (request, response) {
    mysql.selectAllIdAndName(function (error, result) {
        response.json(result)
    })
})

app.get('/:id', function (request, response) {
    mysql.selectById(function (error, result) {
        response.json(result)
    }, request.params.id)
})

app.post('/register', function(request, response) {
    var id = request.body.id
    mysql.selectColorById(function (error, result) {
        if (result[0].color == null) {

            var color = random.generateColor();

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
