const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const setup = require("./db/setup")

const swaggerDoc = require('./helpers/swaggerDoc')

const handleAtividadeRequest = require('./atividades')
const handleAtividadeCentroRequest = require('./atividades_centro')

const adaptRequest = require('./helpers/adapt-request')
const app = express();
app.options('*', cors()) // include before other routes

app.use((req, res, next) => {
    console.log("Acessou o Middleware!");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    app.use(cors());
    next();
});

app.use(bodyParser.json());

app.use('/api/v1/healthcheck', require('./healthcheck'));

app.get('/', function (req, res) {
    const package = require('./package.json')
    const versionInfo = {
        name: package.name,
        version: package.version,
        description: package.description
    }
    res.json(versionInfo)
});

app.all('/api/v1/atividades', atividadeController)
app.use('/api/v1/atividades/:id', atividadeController);

app.all('/api/v1/atividades_centro', atividadeCentroController)
app.use('/api/v1/atividades_centro/:id', atividadeCentroController);

swaggerDoc(app);


function atividadeController(req, res) {
    const httpRequest = adaptRequest(req)
    handleAtividadeRequest(httpRequest)
        .then(({
            headers,
            statusCode,
            data
        }) => {
            res
                .set(headers)
                .status(statusCode)
                .send(data)
        })
        .catch(e => {
            console.log(e);
            res.status(500).end()
        })
}

function atividadeCentroController(req, res) {
    const httpRequest = adaptRequest(req)
    handleAtividadeCentroRequest(httpRequest)
        .then(({
            headers,
            statusCode,
            data
        }) => {
            res
                .set(headers)
                .status(statusCode)
                .send(data)
        })
        .catch(e => {
            console.log(e);
            res.status(500).end()
        })
}

// setup.bootstrap();
module.exports = function () {
    return app;
}