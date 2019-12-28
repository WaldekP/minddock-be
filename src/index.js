require('dotenv').config()
const express = require('express');
const router = require('../routes/index');
const mongoose = require('mongoose');
const cors = require('cors')
const psychologistModel = require('../models/psychologist')

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true }).then(()  => console.log('its ok')).catch(e => console.log('BLA', e))
app.get('/', (req,res) => res.send('<h1>Co to sie zadzialo</h1>'))
app.get('/psychologists', async (req,res) => {
    const psychologists = await psychologistModel.find();
    return res.status(200).send(psychologists);
})
// app.use('/psychologists', router.psychologists)
//
app.listen(process.env.PORT || 2000, () => console.log('Listening at port', 2000))
