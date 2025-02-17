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
const db = require('./app/models');

const API_PREFIX = CONSTANTS.API_PATH;
connection(); // connect to postgre database
const PORT = process.env.PORT || 3001;

db.sequelize.sync({ force: false }) // force: true will drop & recreate tables
    .then(() => {
        console.log('Tables synced!')
    })
    .catch(err => console.error('Error syncing tables:', err));

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


app.use(API_PREFIX, routes);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT);
console.log(`Listening on port ${PORT}`);
console.log(`Server running on http://localhost:${PORT}${API_PREFIX}`);
console.log(`Swagger running on http://localhost:${PORT}/swagger`);