const psychologistModel = require('../models/psychologist');

const getLogin = (req, res) => {
    console.log('xxx', req.session.isLoggedIn)
    if (req.session.isLoggedIn) {
        return res.status(200).redirect('/strefa-psychologa')
    }
    res.send('<form action="http://localhost:2000/login" method="post">\n' +
        'Username: \n' +
        '<input type="text" name="user" id="txtUser" />\n' +
        '<input type="submit" value="Submit" id="btnSend" />\n' +
        '</form>')
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

module.exports = {
    getLogin,
    postLogin,
}
