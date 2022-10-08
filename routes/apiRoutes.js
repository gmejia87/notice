const router = require("express").Router();
const { json } = require("express");
const store = require("../db/store");

//routes here
router.get("/notes", (req, res) => {
  store
    .getNotes()
    .then((notes) => {
      return res.status(200).json(notes);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

module.exports = router;
