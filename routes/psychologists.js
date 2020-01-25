const express = require('express')
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

module.exports = router;

