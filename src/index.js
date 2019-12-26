// require('dotenv').config()
const express = require('express');
// const cors = require('cors');
//
// const PORT = process.env.PORT || 4000;
//
const app = express();
//
// app.use(cors());
//
app.use('/', (req,res) => res.send('<h1>To jest proba</h1>'))
//
app.listen(2000, () => console.log('Listening at port', 2000))

console.log('dssdds')
