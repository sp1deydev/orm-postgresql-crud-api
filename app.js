const express = require('express');
const app = express();
const routes = require('./app/routers/index');
const CONSTANTS = require('./app/configs/constants')
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const connection = require('./connection/postgres');

const API_PREFIX = CONSTANTS.API_PATH;
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

connection(); // connect to postgre database

app.use(API_PREFIX, routes);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT);
console.log(`Listening on port ${PORT}`);
console.log(`Server running on http://localhost:${PORT}${API_PREFIX}`);
console.log(`Swagger running on http://localhost:${PORT}/swagger`);