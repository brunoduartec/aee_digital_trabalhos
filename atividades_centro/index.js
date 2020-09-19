const makeDb = require('../db')
const makeAtividadeList = require('./atividade_centro-list')
const makeAtividadeEndpointHandler = require('./atividade_centro-endpoint')

const database = makeDb()
const atividadeList = makeAtividadeList({
    database
})
const contactsEndpointHandler = makeAtividadeEndpointHandler({
    atividadeList
})

module.exports = contactsEndpointHandler