const swaggerUI = require('swagger-ui-express');

const swaggerDocument = require('../swagger.json');

const envconfig = require("./envconfig")
const env = envconfig.NODE_ENV;

const config = require('../env.json')[env]

swaggerDocument.host = `${config.host}:${config.port}`

module.exports = (app) => {
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
}