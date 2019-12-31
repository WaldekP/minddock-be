const getLogin = (req, res) => {
    res.send('Zalogowano mnie')
}

const postLogin = (req, res) => {
    res.cookie('mindockLogin', 'true', {domain: 'http://localhost:3000'}).sendStatus(200)
}

module.exports = {
    getLogin,
    postLogin,
}
