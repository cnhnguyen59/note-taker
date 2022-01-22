const express = require('express');
const path = require('path');
const {v4: uuidv4} = require('uuid')
const fs = require('fs')
let notesLog = require('./db/db.json')

const PORT = 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Routes
app.get('/', (req, res) =>{
    res.sendFile(path.join(--dirname, '/public/index.html'))
})

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//GET requets for notes
app.get('/api/notes', (req, res) =>
  res.json(notesLog)
);

//POST requets for notes
app.post('/api/notes', (req, res)=>{

    const {title, text} = req.body;

    if(title && text){
        const newNote = {
            title,
            text,
            id: uuidv4()
        }

        notesLog.push(newNote)

        fs.writeFile('./db/db.json', JSON.stringify(notesLog), err => {
            err 
            ? console.err(err)
            : res.send('New note added to log') 
         })
    }
})

// DELETE request for notes
app.delete('/api/notes/:id', (req, res)=>{
    let deleteId = req.params.id
    if(notesLog.some((note) => note.id == deleteId)){
        let updatedNotes = notesLog.filter(note => note.id != deleteId)
        notesLog = updatedNotes
        fs.writeFile('./db/db.json', JSON.stringify(notesLog), err => {
            err 
            ? console.err(err)
            : res.send('Note deleted from log') 
         })
    }

})
 

app.listen(PORT,()=>
    console.log(`App listening at http://localhost:${PORT}`)
);