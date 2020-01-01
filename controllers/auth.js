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
    })
}

const postLogout = async (req, res) => {

    req.session.destroy((err) => {
        console.log(err)
        res.redirect('/login')
    })
}

module.exports = {
    getLogin,
    postLogin,
    postLogout,
}
