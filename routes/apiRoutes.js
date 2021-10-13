const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

router.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', function (err, data) {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    })
});

router.post('/api/notes', (req, res) => {
    const newNotes = req.body;
    newNotes.id = uuidv4();
    fs.readFile('./db/db.json', function (err, data) {
        if (err) throw err;
        const notes = JSON.parse(data);
        notes.push(newNotes);
        fs.writeFile('./db/db.json', JSON.stringify(notes), function (err) {
            if (err) throw err;
            res.json(notes);
        });
    })
})

module.exports = router;