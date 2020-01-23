const express = require('express')
const psychologistModel = require('../models/psychologist')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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',
    }
}))

const router = express.Router()

router.get('/', async (req, res) => {
    // if (!req.session.isLoggedIn) {
    //     res.status(401).send('Not authorised')
    // }
    await psychologistModel.find().then(results => {
        return res.status(200).send(results)
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
        admin: false,
    });
    await psychologist.save()
        .then(result => {
            res.status(200).send(result)
            return transporter.sendMail({
                to: req.body.email,
                from: 'waldkowski@gmail.com',
                subject: 'Signup',
                html: '<h1>Udalo sie zapisac</h1>'
            })
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

