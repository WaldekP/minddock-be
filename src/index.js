require('dotenv').config()
const express = require('express');
const router = require('../routes/index');

const app = express();

app.use('/', router.psychologists)
//
app.listen(process.env.PORT, () => console.log('Listening at port', 2000))
