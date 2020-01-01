require('dotenv').config()
const express = require('express');
const router = require('../routes/index');
const mongoose = require('mongoose');
const cors = require('cors')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');

// var corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

const app = express();
// app.use(cors(corsOptions));
app.all('/*', function(req, res, next) {
    console.log('dupsko')
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true)
    next();
});
app.use(cookieParser());

const store = new MongoDBStore({
    uri: process.env.DB_URL,
    collection: 'sessions',
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store: store, cookie: {
        sameSite: 'lax',
        secure: false,
        httpOnly: false,
    }}));

app.use('/profile', router.profile)
app.get('/', (req,res) => res.send('<h1>Moze zadziala</h1>'))
app.use('/login', router.login)
app.use('/psychologists', router.psychologists)
//
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true }).then((result)  => console.log('MongoDb connected')).catch(e => console.log('BLA', e))

app.listen(process.env.PORT || 2000, () => console.log('Server is on port', 2000))
