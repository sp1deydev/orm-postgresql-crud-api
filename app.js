const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


app.listen(PORT);
console.log(`Listening on port ${PORT}`);