require('dotenv').config()
const express = require('express');
const router = require('../routes/index');
const mongoose = require('mongoose');
const cors = require('cors')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');


const app = express();
app.use(cors());
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
        domain: 'http://localhost:3000/',
        path:'/profile'
    }}));

app.get('/', (req,res) => res.send('<h1>Moze zadziala</h1>'))
app.use('/login', router.login)
app.use('/psychologists', router.psychologists)
app.use('/profile', router.profile)
//
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true }).then((result)  => console.log('MongoDb connected')).catch(e => console.log('BLA', e))

app.listen(process.env.PORT || 2000, () => console.log('Server is on port', 2000))
