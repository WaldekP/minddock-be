const psychologistModel = require('../models/psychologist');
const bcrypt = require('bcryptjs')

const getAuth = (req, res) => {
    if (req.session.isLoggedIn) {
        return res.status(200).send(true)
    } else {
        res.status(200).send(false)
    }
}

const postLogin = async (req, res) => {

    const { body: { email, password }} = req

    const psychologistProfile = await psychologistModel.findOne({ email: email})
    try {
        bcrypt.compare(password, psychologistProfile.password).then((doMatch) => {
            if (doMatch) {
                req.session.isLoggedIn = true
                req.session.psychologist = psychologistProfile
                const { session: {isLoggedIn, psychologist}} = req
                res.status(200).send({
                    psychologist,
                    isLoggedIn,
                })
            } else {
                res.status(401).send('Bad password')
            }
        }).catch((err) => console.log('err', err))

    } catch(err) {
        res.status(401).send('User doesnt exist')
    }

}

const postLogout = async (req, res) => {

    req.session.destroy((err) => {
        res.status(200).send('Wylogowano')
    })
}

module.exports = {
    getAuth,
    postLogin,
    postLogout,
}
