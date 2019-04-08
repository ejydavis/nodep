module.exports = function(app) {
  const fileUpload = require('express-fileupload');

  let express = require("express");
  let router = express.Router();
  let path = require('path')
  let pieces = require('../controllers/pieces.controller.js');

  let appDir = path.dirname(require.main.filename);
  let pathDir = path.join(appDir, "/views/");

  router.use(function (req,res,next) {
    console.log("/" + req.method);
    next();
  });

  app.use(express.static(path.join(__dirname, '../../public')));

  app.get('/', (req,res) => {
    res.sendFile(pathDir + "form.html");
  });

  app.get('/uploadform', (req,res) => {
    res.sendFile(pathDir + "fileupload.html");
  });

  app.use((req,res,next)=> {
    console.log('views work');
    next()
  });

    // Save a piece to MongoDB
    app.post('/api/pieces/create', pieces.create);

    // Retrieve all pieces
    app.get('/api/pieces/all', pieces.findAll);

    // Delete a Piece with Id
    app.delete('/api/pieces/:pieceId', pieces.delete);

    app.use((req,res,next)=> {
      console.log('old posts work');
      next()
    });


    // default options
    app.use(fileUpload());

    app.post('/upload', function(req, res) {
      console.log('In upload');
      console.dir(req.files);
      if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
      }

      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let sampleFile = req.files.sampleFile;

      // Use the mv() method to place the file somewhere on your server
      console.log('Sample file found: ' + sampleFile);
      sampleFile.mv(path.join(__dirname, '../../public/file'), function(err) {
        if (err)
          return res.status(500).send(err);
        res.send('File uploaded!');
      });
    });


    app.use((req,res,next)=> {
      console.log('file upload works');
      next()
    });

  app.use("/",router);

  app.use("*", (req,res) => {
    res.sendFile(pathDir + "404.html");
  });

  // Delete a Piece with Id
  app.delete('/api/pieces/:pieceId', pieces.delete);

//


}

/*

// Pieces routes for routing requests of 'GET/POST/DELETE/UPDATE'

module.exports = function(app) {
  let pieces = require('../controllers/pieces.controller.js');
  let express = require('express');
  let router = express.Router();
  let path = __dirname + '/views/';

  router.use(function (req,res,next) {
    console.log("/" + req.method);
    next();
  });

  app.get('/', (req,res) => {
    res.sendFile(path + "form.html");
  });

  app.use("*", (req,res) => {
    res.sendFile(path + "404.html");
  });

  app.use("/",router);

  // Create a new Piece
  app.post('/api/pieces', pieces.create);

  // Retrieve all Pieces
  app.get('/api/pieces', pieces.findAll);

  // Retrieve a single Piece by Id
  app.get('/api/pieces/:pieceId', pieces.findOne);

  // Update a Piece with Id
  app.put('/api/pieces/:pieceId', pieces.update);

  // Delete a Piece with Id
  app.delete('/api/pieces/:pieceId', pieces.delete);

}

*/
