const getLogin = (req, res) => {
    res.send('Zalogowano mnie')
}

const postLogin = (req, res) => {
    req.session.isLoggedIn = true
    res.sendStatus(200)
}

module.exports = {
    getLogin,
    postLogin,
}
