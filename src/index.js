require('dotenv').config()
const express = require('express');
const router = require('../routes/index');
const mongoose = require('mongoose');
const Psychologist = require('../models/psychologist')
const foodRouter = require('../models/food')

// const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://waldek:azorek1@cluster0-ipbva.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });


const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect(uri, {useNewUrlParser: true}).catch(e => console.log('BLA', e))

app.use(router.psychologists)
//
app.listen(process.env.PORT || 2000, () => console.log('Listening at port', 2000))
