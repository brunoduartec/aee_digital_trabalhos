const makeDb = require('../db')
const makeAtividadeList = require('./atividade-list')
const makeAtividadeEndpointHandler = require('./atividade-endpoint')

const database = makeDb()
const atividadeList = makeAtividadeList({
    database
})
const atividadesEndpointHandler = makeAtividadeEndpointHandler({
    atividadeList
})

module.exports = atividadesEndpointHandler