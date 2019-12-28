require('dotenv').config()
const express = require('express');
const router = require('../routes/index');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req,res) => res.send('<h1>Moze zadziala</h1>'))
app.use('/psychologists', router.psychologists)
//
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true }).then((result)  => app.listen(process.env.PORT || 2000, () => console.log('Server running on port', 2000))).catch(e => console.log('BLA', e))

