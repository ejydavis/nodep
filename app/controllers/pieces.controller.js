// This controller js file contains methods for executing the URL requests for pieces

const Piece = require('../models/pieces.model.js');

exports.create = (req,res) => {
  //console.log('Post a piece: ' + JSON.stringify(req.body));
  // Create a piece
  let newpiece = new Piece({
    owner: req.body.owner,
    title: req.body.title
  });

  // Save a piece in the MongoDB
  newpiece.save()
  .then( data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
};

// Fetch all pieces
exports.findAll = (req, res) =>  {
  console.log("Fetch all pieces");

    Piece.find()
    .then(pieces => {
        res.send(pieces);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.delete = (req,res) => {
  Piece.findByIdAndRemove(req.params.pieceId)
  .then(piece => {
    if(!piece) {
      return res.status(404).send({
        message: "piece not found with id " + req.params.pieceId
      });
    }
    res.send({message: "piece deleted Successfully!"});
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: "piece not found with id " + req.params.pieceId
      });
    }
    return res.status(500).send({
      message: "Could not delete piece with id " + req.params.pieceId
    });
  });
};

/* const piece = require('../models/pieces.model.js');

// POST a piece

exports.create = (req,res) => {
  // Create a piece
  let newpiece = new piece({
    owner: req.body.owner,
    title: req.body.title
  });

  // Save a piece in the MongoDB
  newpiece.save()
  .then( data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
};

// FETCH all pieces

exports.findAll = (req,res) => {
  piece.find()
  .then( pieces => {
    res.send(pieces);
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  })
};

// FIND a piece

exports.findOne = (req,res) => {
  piece.findById(req.params.pieceId)
  .then(piece => {
    if(!piece) {
      return res.status(404).send({
        message: "piece not found with id " + req.params.pieceId
      });
    }
    res.send(piece);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "piece not found with id " + req.params.pieceId
      });
    }
    return res.status(500).send({
      message: "Error retrieving piece with id " + req.params.pieceId
    });
  });
};

// UPDATE a piece

exports.update = (req,res) => {
  // Find a piece and update it
  piece.findByIdAndUpdate(req.params.pieceId, {
    owner: req.body.owner,
    title: req.body.title
  }, {new: true})
  .then(piece => {
    if(!piece) {
      return res.status(404).send({
        message: "piece not found with id " + req.params.pieceId
      });
    }
    res.send(piece);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "piece not found with id " + req.params.pieceId
      });
    }
    return res.status(500).send({
      message: "Error updating piece with id " + req.params.pieceId
    });
  });
};

// DELETE a piece

exports.delete = (req,res) => {
  piece.findByIdAndRemove(req.params.pieceId)
  .then(piece => {
    if(!piece) {
      return res.status(404).send({
        message: "piece not found with id " + req.params.pieceId
      });
    }
    res.send({message: "piece deleted Successfully!"});
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: "piece not found with id " + req.params.pieceId
      });
    }
    return res.status(500).send({
      message: "Could not delete pice with id " + req.params.pieceId
    });
  });
};

*/
