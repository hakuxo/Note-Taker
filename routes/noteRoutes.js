const router = require("express").Router()
const express = require("express");
const fs = require("fs");
const app = require(".");


const readNotes = () => {
    console.log("reading notes!")
    fs.readFile("../db/db.json", (err, data) => {
        if (err) throw err
    })
};

const editNote = (updatedNotesArray) => {
    fs.writeFile("./db/db.json", JSON.stringify(updatedNotesArray), (err) => {
        if (err) {
            throw err
        } else {
            return updatedNotesArray;
        }
    });
};

router.get("/", (req, res) => {
    console.log("notes are being hit here!")
    const notes = readNotes()
    console.log(notes)
    res.json(notes)

});

const addNote = (updatedNotesArray) => {
    fs.writeFile("./db/db.json", JSON.stringify(updatedNotesArray), (err) => {
        if (err) {
            throw err
        } else {
            return updatedNotesArray
        }
    });
};

router.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;
    if (title && text) { 
        const newNote = {
            title,
            text,
        };
        fs.readFile("db/db.json", (err, data) => {
            if (err) throw err;
            const allNotes = JSON.parse(data);
            allNotes.push(newNote);

            fs.writeFileSync("./db/db.json", JSON.stringify(allNotes, null, 4), (writeErr) => {
                writeErr
                ? console.error(writeErr)
                : console.log(`$newNote.title} has been added to JSON`)
            });
        });
            const response = {
                status: 'success',
                body: newNote,
            };
            
        res.json(response);
    } else {
        res.json('Error in posting note');
    }
});


module.exports = router;