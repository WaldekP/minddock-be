const express = require('express')
const psychologistModel = require('../models/psychologist')

const router = express.Router()


router.get('/', async (req, res) => {
    const psychologists = await psychologistModel.find();
    return res.status(200).send(psychologists);
});

router.post('/', async (req, res) => {
    const psychologist = new psychologistModel(
        {
            name: 'Waldziuchna',
            surname: 'Pieniak'
        }
    );
    await psychologist.save();
    return res.status(200).send(req.body);
});
module.exports = router;

