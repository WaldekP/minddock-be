const psychologistModel = require('../models/psychologist');

const getLogin = (req, res) => {
    console.log('xxx', req.session.isLoggedIn)
    if (req.session.isLoggedIn) {
        return res.status(200).send('Jestes zalogowany palko')
    }
    res.send('<form action="http://localhost:2000/login" method="post">\n' +
        'Username: \n' +
        '<input type="text" name="user" id="txtUser" />\n' +
        '<input type="submit" value="Submit" id="btnSend" />\n' +
        '</form>')
}

const postLogin = async (req, res) => {

    const psychologist = await psychologistModel.findOne()
    req.session.isLoggedIn = true
    req.session.psychologist = psychologist
    res.redirect('/strefa-psychologa').sendStatus(200)
}

module.exports = {
    getLogin,
    postLogin,
}
