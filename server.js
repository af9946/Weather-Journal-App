// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 5500;

// Setup Server
const server = app.listen(port, listening);
function listening(){
    console.log(`running on localhost: ${port}`);
}

// Get route
app.get('/all', sendData);
function sendData(req, res) {
    res.send(projectData);
}

// Post weather info
app.post('/journalInfo', addJournal);
function addJournal(req, res) {
    newJournal = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }
    
    projectData = newJournal;
    res.send(projectData);
}
