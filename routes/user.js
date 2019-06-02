var express = require('express');
var router = express.Router();

//Get the controller
var UserController = require('../controllers/user')

//Test Endpoint
router.get('/test', function (req, res) {
        res.end("User Controller Test")
    })

    //Create new user
    .post('/create', UserController.createUser)

    //Get user details
    .get('/get/:username', UserController.getUser)

    //User Login
    .post('/login', UserController.login)


module.exports = router