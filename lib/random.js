// var mysql = require('./mysql/mysql')
var kue = require('kue')
var jobs = kue.createQueue()
var q = require('q')

var slot = [[0, 0, 0, 0, 0, 0], [2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2]]

module.exports = {
  generateColor: function (colors, gender, branch) {
    var deferred = q.defer()
    newJob(colors, gender, branch).then(function (result) {
      if (!result.error) {
        deferred.resolve(result)
      } else {
        deferred.reject({error: 'error'})
      }
    })
    return deferred.promise
  },

  getSlot: function () {
    return slot
  }
}

jobs.process('generateColor', 1, function (job, done) {
  var color = randomColor(job.data.colors, job.data.gender, job.data.branch)
  done(null, color)
})

var newJob = function (colors, gender, branch) {
  var deferred = q.defer()
  var job = jobs.create('generateColor', {
    colors: colors,
    gender: gender,
    branch: branch
  })

  job
    .on('complete', function (result) {
      deferred.resolve(result)
    })
    .on('error', function () {
      deferred.reject({error: 'error'})
    })

  job.save()

  return deferred.promise
}

var randomColor = function (colors, gender, branch) {
  var color

  if (gender == 'F') {
    color = random(getPossible(colors, 0))
    slot[0][color]--
  } else if (branch == 'CPE') {
    color = random(getPossible(colors, 1))
    slot[1][color]--
  } else if (branch == 'SKE') {
    color = random(getPossible(colors, 2))
    slot[2][color]--
  }

  console.log('random color: ' + color)
  console.log('slot f: ' + slot[0])
  console.log('slot c: ' + slot[1])
  console.log('slot s: ' + slot[2])

  return {color: color}
}

var random = function (possible) {
  return possible.charAt(Math.floor(Math.random() * possible.length))
}

var getPossible = function (colors, type) {
  var possible = ''

  colors.forEach(function (color) {
    if (slot[type][color.color_id] > 0) {
      possible += color.color_id
    }
  })

  if (possible == '') {
    slot[type] = [2, 2, 2, 2, 2, 2]
    possible = '012345'
  }

  return possible
}
