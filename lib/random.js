var mysql = require('./mysql/mysql')

var slot = [[2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2]]

module.exports = {
    generateColor: function (colors, gender, branch) {
        return randomColor(colors, gender, branch)
    },

    getSlot: function () {
        return slot
    }
}

var randomColor = function (colors, gender, branch) {
    var color;

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

    console.log("random color: " + color)
    console.log("slot f: " + slot[0])
    console.log("slot c: " + slot[1])
    console.log("slot s: " + slot[2])

    return {color: color}
}

var random = function (possible) {
    return possible.charAt(Math.floor(Math.random() * possible.length))
    //return possible
}

var getPossible = function (colors, type) {
    var possible = ""

    colors.forEach(function (color) {
        if (slot[type][color.color_id] > 0) {
            possible += color.color_id
        }
    })

    return possible
}
