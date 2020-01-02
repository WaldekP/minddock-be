const psychologistModel = require('../models/psychologist');

const getLogin = (req, res) => {
    console.log('xxx', req.session.isLoggedIn)
    if (req.session.isLoggedIn) {
        return res.status(200).send('Klient zalogowany' + '</form><form action="http://localhost:2000/login/logout" method="post">\n' +
            '<input type="submit" value="Wyloguj" id="btnSend" />\n' +
            '</form>')
    } else {
        res.send('<form action="http://localhost:2000/login" method="post">\n' +
            'Username: \n' +
            '<input type="text" name="user" id="txtUser" />\n' +
            '<input type="submit" value="Zaloguj" id="btnSend" />\n' +
            '</form>')
    }
}

const postLogin = async (req, res) => {

    const psychologistProfile = await psychologistModel.findOne()
    req.session.isLoggedIn = true
    req.session.psychologist = psychologistProfile

    const { session: {isLoggedIn, psychologist}} = req
    res.status(200).send({
        psychologist,
        isLoggedIn,
        cookie: req.cookies,
    })
}

const postLogout = async (req, res) => {

    req.session.destroy((err) => {
        res.status(200).send('Wylogowano')
    })
}

const postSignUp = (async, res) => {
    const { body: { name, surname, email, password, confirmPassword} } = req
}

module.exports = {
    getLogin,
    postLogin,
    postLogout,
}
