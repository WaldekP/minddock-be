const getLogin = (req, res) => {
    res.send('Zalogowano mnie')
}

const postLogin = (req, res) => {
    res.cookie('mindockLogin', 'true').sendStatus(200)
}

module.exports = {
    getLogin,
    postLogin,
}
