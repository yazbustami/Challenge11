// set up express
// do all the config 
// define  api routes
// define html routes
// turn on server (listener)

const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const fileNotes = require('./db/db.json');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(fileNotes.slice(1));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

function NewNote(body, NArray) {
    const AddNote = body;
    if (!Array.isArray(NArray))
    NArray = [];

    if (NArray.length ===0)
    NArray.push(0);

    body.id = NArray[0];
    NArray[0]++;

    NArray.push(AddNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(NArray, null, 2)
    );
    return AddNote;
}

app.post('/api/notes', (req, res) => {
    const AddNote = NewNote(req.body, fileNotes);
    res.json(AddNote);
});

function DelNote(id, NArray) {
    for (let i = 0; i < NArray.lrngth; i++) {
        let theNotes = NArray[i];

        if (theNotes.id == id) {
            NArray.splice(i,1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.jscon'),
                JSON.stringify(NArray, null, 2)
            );

            break;
        }
    }
}

