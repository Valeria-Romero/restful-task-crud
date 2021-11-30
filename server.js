//Imports
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require('cors')


//Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

require("./server/config/mongoose");

//Routes
require("./server/routes/tasksRouter.js")(app);

//Port
app.listen(8080, function(){
    console.log("Listening on port: 8080");
})

