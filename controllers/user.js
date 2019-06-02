var User = require('../models/user')
var utils = require('../utils')

/**
 * @param {Request} request
 * @param {Response} response
 */
exports.createUser = function (request, response) {
    var user = new User({
        username: request.body.username,
        password: request.body.password
    })

    //Save
    user.save(function (err) {
        if (err) {
            utils.jsonOut(response, utils.FAILED, "Error creating note")
            console.error(err)
            return
        }

        // response.send("User Created Successfully")
        utils.jsonOut(response, utils.SUCCESS, "User Created Successfully")
        // response.end()
    })
}

/**
 * @param {Request} request
 * @param {Response} response
 */
exports.getUser = function (request, response) {
    User.findOne({
        username: request.params.username
    }, 'username password', function (err, user) {
        if (err) {
            utils.jsonOut(response, utils.FAILED, "Server error.")
            return
        }

        response.send(user)
    })
}

/**
 * @param {Request} request
 * @param {Response} response
 */
exports.login = function (request, response) {
    User.findOne({
        username: request.body.username
    }, 'username password', function (err, user) {
        if (err) {
            utils.jsonOut(response, utils.FAILED, "Server error.")
            console.error(err)
            return
        }

        if (user == null || user == undefined) {
            utils.jsonOut(response, utils.FAILED, "Incorrect username and/or password used")
            return
        }
        console.log(user)
        //Compare passwords
        user.comparePassword(request.body.password, function (err, areTheSame) {
            if (err) {
                utils.jsonOut(response, utils.FAILED, "Incorrect password and/or username used")
                return
            }

            if (!areTheSame) {
                utils.jsonOut(response, utils.FAILED, "Login Failed.")
            } else {
                utils.jsonOut(response, utils.SUCCESS, "Login Successful.", [{
                    username: request.body.username
                }])
            }
        })
    })
}