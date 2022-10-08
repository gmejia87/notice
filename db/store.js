const fs = require("fs");
const util = require("util");
const { v4: generateId } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync("db/db.json", "utf-8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
      return JSON.parse(notes);
    });
  }
  addNote(note) {
    if (!note.title || !note.text) {
      throw new Error("Can not leave title and text empty.");
    }

    note.id = generateId();

    //need the array of existing notes
    return this.getNotes()
      .then((notes) => {
        notes.push(note);
        return notes;
      })
      .then((notes) => {
        return this.write(notes);
      })
      .then(() => {
        return note;
      });

    //this.write the new array
  }
  deleteNote(id) {
    return this.getNotes()
      .then((notes) => {
        const filtered = notes.filter((note) => {
          return note.id !== id;
        });

        return filtered;
      })
      .then((notes) => {
        return this.write(notes);
      });
  }
}

module.exports = new Store();
