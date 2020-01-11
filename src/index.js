require('dotenv').config()
const express = require('express');
const router = require('../routes/index');
const mongoose = require('mongoose');
const cors = require('cors')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
// const csrf = require('csurf')


const app = express();
// app.use(cors(corsOptions));

app.all('/*', function(req, res, next) {
    const allowedOrigins = [ 'http://localhost:4000', 'https://fast-cliffs-60930.herokuapp.com'];
    const origin = req.headers.origin;

    console.log('origin', origin)
    if(allowedOrigins.indexOf(origin) > -1){
        res.header("Access-Control-Allow-Origin", origin)
    }
    // res.header("Access-Control-Allow-Origin", 'http://localhost:3000')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true)
    next();
});
app.use(cookieParser());

const store = new MongoDBStore({
    uri: process.env.DB_URL,
    collection: 'sessions',
})

// const csrfProtection = csrf({ cookie: true})
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store: store, cookie: {
        sameSite: 'lax',
        secure: false,
        httpOnly: false,
    }}));

// app.get('/getcsrftoken', csrfProtection, function (req, res) {
//     return res.json({ csrfToken: req.csrfToken() });
// })
// app.use(csrfProtection)
app.use('/profile', router.profile)
app.get('/', (req,res) => res.redirect('/psychologists'))
app.use('/login', router.login)
app.use('/psychologists', router.psychologists)
//
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true }).then((result)  => console.log('MongoDb connected')).catch(e => console.log('BLA', e))

app.listen(process.env.PORT || 2000, () => console.log('Server is on port', 2000))
