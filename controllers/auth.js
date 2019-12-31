const getLogin = (req, res) => {
    res.send('Zalogowano mnie')
}

const postLogin = (req, res) => {
    req.session.isLoggedIn = true
    res.cookie('first', 'try').sendStatus(200)
}

module.exports = {
    getLogin,
    postLogin,
}
