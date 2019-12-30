const getLogin = (req, res) => {
    res.cookie('mindockLogin', 'true').send('Zalogowano mnie')
}

module.exports = {
    getLogin
}
