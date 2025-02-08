const swaggerAutogen = require('swagger-autogen')();
const CONSTANTS = require('./app/configs/constants')

const API_PREFIX = CONSTANTS.API_PATH;
const PORT = process.env.PORT || 3001;
const doc = {
  info: {
    title: 'PostgreSQL CRUD API',
    description: 'API documentation',
  },
  host: `localhost:${PORT}${API_PREFIX}`,
};

const outputFile = './swagger-output.json';
const routes = ['./app.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);