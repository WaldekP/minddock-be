require('dotenv').config()
const express = require('express');
const router = require('../routes/index');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true }).catch(e => console.log('BLA', e))

app.use(router.psychologists)
//
app.listen(process.env.PORT || 2000, () => console.log('Listening at port', 2000))
