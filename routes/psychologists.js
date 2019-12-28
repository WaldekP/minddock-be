const express = require('express')
const psychologistModel = require('../models/psychologist')

const router = express.Router()

router.get('/', async (req, res) => {
    const psychologists = await psychologistModel.find();
    return res.status(200).send(psychologists);
});

router.post('/', async (req, res) => {
    const psychologist = new psychologistModel(req.body);
    await psychologist.save();
    return res.status(200).send(req.body);
});

router.put('/:id', async (req, res) => {
    console.log('query', req.query)
    const psychologist = await psychologistModel.findByIdAndUpdate({_id: "5e05ef91084a7c2e01e32aa7"}, {name: req.query.name}, { upsert: true },)
    res.status(200).send(psychologist)
})
module.exports = router;

