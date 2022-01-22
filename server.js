const express = require('express');
const path = require('path');
const fs = require('fs')
const notesLog = require('./db/db.json')

let rawData = fs.readFileSync('./db/db.json')
let notesArr = JSON.parse(rawData)
console.log(notesArr)

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
            id: 1
        }
        notesArr.push(newNote)
        console.log(notesArr)
        console.log(typeof notesArr)

        let noteString = JSON.stringify(notesArr)

        fs.writeFile('./db/db.json', noteString, err => {
            err 
            ? console.err(err)
            : res.send('New note added to JSON file')
     
         })
        
    }
})

// DELETE request for notes
 

app.listen(PORT,()=>
    console.log(`App listening at http://localhost:${PORT}`)
);