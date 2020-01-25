const express = require('express')
const psychologistModel = require('../models/psychologist')

const router = express.Router()

router.get('/', (req, res) => {
    console.log('cookies', req.cookies)
    if (req.session.isLoggedIn) {
        res.status(200).send({
          psychologist: req.session.psychologist,
            cookie: req.cookies,
        })
    } else {
        res.status(401).send('User not authenticated')
    }
})

router.put('/:id', async (req, res) => {
    // await psychologistModel.findByIdAndUpdate({_id: req.params.id}, {name: req.query.name}, { upsert: true },)
    //     .then(result => res.status(200).send(result))
    //     .catch(err => res.status(404).send('Error', err))

    const { body: { name, password} } = req;

    const newPassword = await bcrypt.hash(12, password)

    await psychologistModel.findById(req.params.id )
        .then(result => {
            console.log('result', result)
            result.name = name;
            result.password = newPassword;
            result.save()
            return res.status(200).send(result)
        })
        .catch(err => res.status(404).send('Error', err))
})

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
                subject: `Signup for ${req.body.name} ${req.body.surname}`,
                html: '<h1>Udalo sie zapisac</h1>'
            })
        }).catch(err => res.status(404).send('Error', err));
});



router.delete('/:id', async (req, res) => {
    await psychologistModel.findByIdAndRemove(req.params.id )
        .then(() => {
            return res.sendStatus(200)
        })
        .catch(() => res.sendStatus(404));
})

module.exports = router
