const express = require('express');
const dinosaurRouter = express.Router();
const {v4: uuidv4} = require('uuid');

const dinosaurs = [
    {
        species: 'Tyrannosaurus rex',
        suborder: 'theropoda'
    },
    {
        species: 'Suchomimus tenerensis',
        suborder: 'theropoda'
    },
    {
        species: 'Argentinosaurus huinculensis',
        suborder: 'sauropodomorpha'
    },
    {
        species: 'Venenosaurus dicrocei',
        suborder: 'sauropodomorpha'
    }
];

dinosaurRouter.route('/')
    .get((req, res) => {
        if (req.query.suborder) {
            res.send(dinosaurs.filter(dinosaur => dinosaur.suborder === req.query.suborder))
        } else {
            res.send(dinosaurs)
        }
    })

module.exports = dinosaurRouter;