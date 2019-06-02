var Note = require('../models/note')
var utils = require('../utils')
var moment = require('moment')


/**
 * @param {Request} request
 * @param {Response} response
 */
exports.createNote = function (request, response) {
    var note = new Note({
        note_header: request.body.note_header,
        note_content: request.body.note_content,
        created_on: moment().format('ddd, MMMM D YYYY, h:mm:ss a')
    })

    //Save
    note.save(function (err) {
        if (err) {
            utils.jsonOut(response, utils.FAILED, "Error creating note")
            console.error(err)
            return
        }

        // response.send("Note Created Successfully")
        utils.jsonOut(response, utils.SUCCESS, "Note Created Successfully")
        // response.end()
    })
}

/**
 * @param {Request} request
 * @param {Response} response
 */
exports.getSingleNote = function (request, response) {
    Note.findById(request.query.id, "note_header note_content created_on", function (err, results) {
        if (err) {
            utils.jsonOut(response, utils.FAILED, "Error getting note info")
            console.error(err)
            return
        }

        utils.jsonOut(response, utils.SUCCESS, "Single note", results)
    })
}

/**
 * @param {Request} request
 * @param {Response} response
 */
exports.getAllNotes = function (request, response) {
    console.log("Getting all notes...")
    Note.find({}, "note_header note_content created_on", function (err, results) {
        if (err) {
            utils.jsonOut(response, utils.FAILED, "Error getting all notes")
            console.error(err)
            return
        }

        console.log(results)
        utils.jsonOut(response, utils.SUCCESS, "All notes.", results)
    })
}