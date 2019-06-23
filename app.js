var mongoose = require('mongoose')
var User = require('./models/user')

let devDbUrl = 'mongodb://localhost:27017/VueTrainingBackend'
mongoose.connect(devDbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}, function (err) {
    if (err) throw err
    console.log("Connected to Database:VueTrainingBackend successfully")
})

var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var UserRoutes = require('./routes/user')
var NoteRoutes = require('./routes/note')

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(function (request, response, next) {
    console.log("Request at", request.url, "body=", request.body, "URL params=", request.params, "query params=", request.query)
    next()
})

app.use('/user', UserRoutes)
app.use('/note', NoteRoutes)


app.get('/test', function (req, res) {
    res.send("MAIN TEST URL")
})

let ip = '127.0.0.1',
    port = 1234
app.listen(port, port, function () {
    console.log('VueTrainingBackend Server is up and running on ' + ip + ":" + port);
})

// //Test User
// var testUser = new User({
//     username: "testUserName",
//     password: "12345678"
// })
// //Save to db
// testUser.save(function(err) {
//     if(err) throw err;

//     //Find one
//     User.findOne({username: "testUserName"}, function(err, user) {
//         if(err) throw err;

//         // test a matching password
//         user.comparePassword('12345678', function(err, isMatch) {
//             if (err) throw err;
//             console.log('12345678:', isMatch); // -> Password123: true
//         });

//         // test a failing password
//         user.comparePassword('123Password', function(err, isMatch) {
//             if (err) throw err;
//             console.log('123Password:', isMatch); // -> 123Password: false
//         });
//     })
// })