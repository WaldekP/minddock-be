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

console.log('bbbbb')

app.use('/', (req,res) => res.send('<h1>To jest proba</h1>'))
//
app.listen(process.env.PORT, () => console.log('Listening at port', 2000))
