const express = require('express');
const router = express.Router();
const Institute = require('../../db/models/Institute');

router.get('/', (req, res, next) => {
    Institute.find()
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    }).catch(err => res.status(500).json(err));
});

/**
 * Get all institutes by a distance
 */
router.get('/by_distance', (req, res, next) => {
    let coordinates = req.query.query.split(",");
    Institute.find({
        loc: {
            $nearSphere: coordinates.reverse(), 
            $maxDistance: 0.001
        }
    })
    .exec()
    .then(docs => {
        res.status(200).json(docs.map(doc => ({
            id: doc._id,
            name: doc.name,
            address: doc.address,
            city: doc.city,
            phone: doc.phone,
            geocode: {
                lat: doc.loc.coordinates[1],
                long: doc.loc.coordinates[0],
            },
            scores: doc.scores
        })));
    }).catch(err => res.status(500).json(err));
});

router.get('/drop', (req, res, next) => {
    Institute.remove({}, (err) => { 
        res.status(200).json("Sucesso!");
     });
});

module.exports = router;