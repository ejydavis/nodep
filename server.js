let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json())

app.use(express.static('resources'));
global.__basedir = __dirname;

// Configuring the database

let dbConfig = require('./app/config/mongodb.config.js');
let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database

mongoose.connect(dbConfig.url).then(() => {
  console.log("Successfully connected to MongoDB.");
}).catch(err => {
  console.log('Could not connect to MongoDB.');
  process.exit();
})

require('./app/routes/pieces.routes.js')(app);

// Create the server
let server = app.listen(8081, function () {

    let host = server.address().address
    let port = server.address().port

    console.log("App listening at http://%s%s", host, port)
})
