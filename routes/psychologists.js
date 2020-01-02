const express = require('express')
const psychologistModel = require('../models/psychologist')
const bcrypt = require('bcryptjs')

const router = express.Router()

router.get('/', async (req, res) => {
    await psychologistModel.find().then(results => {
        return res.status(200).cookie('name', 'tobi', { maxAge: 900000 }).send(results)
    }).catch(() => res.sendStatus(404));
});

router.post('/', async (req, res) => {
    const { body: { name, surname, email, password} } = req

    if (!(name && surname && email && password)) {
        return res.sendStatus(404)
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const psychologist = new psychologistModel({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: hashedPassword,
    });
    await psychologist.save()
        .then(result => {
        res.status(200).send(result)
    }).catch(err => res.status(404).send('Error', err));
});

router.put('/:id', async (req, res) => {
    // await psychologistModel.findByIdAndUpdate({_id: req.params.id}, {name: req.query.name}, { upsert: true },)
    //     .then(result => res.status(200).send(result))
    //     .catch(err => res.status(404).send('Error', err))

    await psychologistModel.findById(req.params.id )
        .then(result => {
            console.log('result', result)
          result.name = req.query.name;
          result.save()
            return res.status(200).send(result)
        })
        .catch(err => res.status(404).send('Error', err))
})

router.delete('/:id', async (req, res) => {
    await psychologistModel.findByIdAndRemove(req.params.id )
        .then(() => {
            return res.sendStatus(200)
        })
        .catch(() => res.sendStatus(404));
})
module.exports = router;

