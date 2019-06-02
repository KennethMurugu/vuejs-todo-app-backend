/*
Model representing a note written by a user
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var NoteSchema = new Schema({
    //This can technically be an email also
    note_header: {
        type: String,
        required: true
    },
    note_content: {
        type: String,
        required: false
    },
    created_on: {
        type: String,
        required: true
    }
})

//Export model
module.exports = mongoose.model('Note', NoteSchema)