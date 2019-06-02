var express = require('express');
var router = express.Router();

//Get the controller
var NoteController = require('../controllers/note')

//Test Endpoint
router.get('/test', function (req, res) {
        res.send("Note Controller Test")
    })

    //Create new note
    .post('/create', NoteController.createNote)

    //Get single note
    .get('/get', NoteController.getSingleNote)

    //Get all notes
    .get('/get/all', NoteController.getAllNotes);


module.exports = router