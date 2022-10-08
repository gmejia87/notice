const router = require("express").Router();
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

router.post("/notes", (req, res) => {
  store
    .addNote(req.body)
    .then((note) => {
      return res.status(200).json(note);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

router.delete("/notes/:id", (req, res) => {
  store
    .deleteNote(req.params.id)
    .then(() => {
      return res.json({ message: "Note deleted" });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

module.exports = router;
