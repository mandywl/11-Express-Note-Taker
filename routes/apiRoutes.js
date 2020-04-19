// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

let noteData = require("../db/db.json");
let id = 1;

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function (req, res) {
    res.json(noteData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    newNote.id = id;
    id++;
    noteData.push(newNote);
    //console.log("request is", req.body);
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the notes while working with the functionality.
  // Don"t worry about it!

  app.delete("/api/notes/:id", function (req, res) {
    noteData.map(function (item) {
      //console.log(item.id==req.params.id);
      console.log("req.params.id is ", req.params.id);
      if (item.id == req.params.id) {
        noteData.splice(req.params.id, 1);
        console.log("result is ", noteData);
        res.json(noteData);
      }
    });
  });
};
