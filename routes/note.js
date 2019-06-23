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
    .get('/get/all', NoteController.getAllNotes)

    //Update note details
    .post('/update', NoteController.updateSingleNote)

    //Delete single note
    .post('/delete', NoteController.deleteSingleNote)



module.exports = router