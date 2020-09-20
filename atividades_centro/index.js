const makeDb = require('../db')
const makeAtividadeCentroList = require('./atividade_centro-list')
const makeAtividadeCentroEndpointHandler = require('./atividade_centro-endpoint')

const database = makeDb()
const atividadeCentroList = makeAtividadeCentroList({
    database
})
const atividadesCentroEndpointHandler = makeAtividadeCentroEndpointHandler({
    atividadeCentroList
})

module.exports = atividadesCentroEndpointHandler