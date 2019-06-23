var Note = require("../models/note");
var utils = require("../utils");
var moment = require("moment");

const NOTE_DETAILS_PROJECTION =
  "note_header note_content body_bg_color header_bg_color created_on last_update";

/**
 * @param {Request} request
 * @param {Response} response
 */
exports.createNote = function(request, response) {
  var note = new Note({
    note_header: request.body.note_header,
    note_content: request.body.note_content,
    body_bg_color: "rgb(255, 255, 255)",
    header_bg_color: "#e3e3e3",
    created_on: utils.now()
  });

  //Save
  note.save(function(err, res) {
    if (err) {
      utils.jsonOut(response, utils.FAILED, "Error creating note");
      console.error(err);
      return;
    }

    // console.log("After create:", res)
    // response.send("Note Created Successfully")
    utils.jsonOut(response, utils.SUCCESS, "Note Created Successfully", res);
    // response.end()
  });
};

/**
 * @param {Request} request
 * @param {Response} response
 */
exports.getSingleNote = function(request, response) {
  Note.findById(request.query.id, NOTE_DETAILS_PROJECTION, function(
    err,
    results
  ) {
    if (err) {
      utils.jsonOut(response, utils.FAILED, "Error getting note info");
      console.error(err);
      return;
    }

    utils.jsonOut(response, utils.SUCCESS, "Single note", results);
  });
};

/**
 * @param {Request} request
 * @param {Response} response
 */
exports.getAllNotes = function(request, response) {
  console.log("Getting all notes...");
  Note.find({}, NOTE_DETAILS_PROJECTION, function(err, results) {
    if (err) {
      utils.jsonOut(response, utils.FAILED, "Error getting all notes");
      console.error(err);
      return;
    }

    console.log(results);
    utils.jsonOut(response, utils.SUCCESS, "All notes.", results);
  });
};

/**
 * @param {Request} request
 * @param {Response} response
 */
exports.updateSingleNote = function(request, response) {
  console.log("Updating single note...");
  Note.findById(request.query.id, NOTE_DETAILS_PROJECTION, function(err, note) {
    if (err) {
      utils.jsonOut(response, utils.FAILED, "Error updating the note(x01)");
      console.error(err);
      return;
    }

    // utils.jsonOut(response, utils.SUCCESS, "Single note", doc)
    if (!note) {
      utils.jsonOut(response, utils.FAILED, "No note with specified ID");
      return;
    }

    note.note_header = request.body.note_header;
    note.note_content = request.body.note_content;
    note.body_bg_color = request.body.body_bg_color;
    note.header_bg_color = request.body.header_bg_color;
    note.last_update = utils.now();

    note.save(function(err, res) {
      if (err) {
        utils.jsonOut(response, utils.FAILED, "Error updating the note(x02)");
        console.error(err);
        return;
      }

      // console.log(results)
      utils.jsonOut(response, utils.SUCCESS, "Note updated successfully.", res);
    });
  });
};

/**
 * @param {Request} request
 * @param {Response} response
 */
exports.deleteSingleNote = function(request, response) {
  console.log("Deleting single note...");
  Note.findByIdAndDelete(request.query.id, function(err, res) {
    if (err) {
      utils.jsonOut(response, utils.FAILED, "Error deleting the note(x01)");
      console.error(err);
      return;
    }
    console.log(res);
    if (!res) {
      //No note was deleted
      utils.jsonOut(response, utils.FAILED, "No note was deleted(x02)");
      return;
    }

    utils.jsonOut(response, utils.SUCCESS, "Note deleted successfully.");
  });
};
