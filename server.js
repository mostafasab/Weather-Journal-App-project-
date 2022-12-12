// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express(); 
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//POST Route
app.post("/add", async function(req, res){
    const body = await req.body;
    projectData = body;
    res.status(200).send(projectData);
    console.log(projectData);
});

//GET Route
app.get("/all", (req, res) => {
    console.log(projectData);
    res.send(projectData);
})

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 5000;
//spin up the server
const server = app.listen(port, listening);
//callback the debug
function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}