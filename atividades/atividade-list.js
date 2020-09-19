const makeAtividade = require('./atividade')
const {
    UniqueConstraintError
} = require('../helpers/errors')

module.exports = function makeAtividadeList({
    database
}) {
    return Object.freeze({
        add,
        findById,
        getItems,
        remove,
        replace,
        update
    })

    async function add({
        atividadeId,
        ...atividade
    }) {

        return await database.add("ATIVIDADES", atividade)
    }
    async function findById({
        atividadeId
    }) {
        const params = ["ID_ATIVIDADE", "NOME_ATIVIDADE"]
        return await database.findById("ATIVIDADES", params, {
            ID_ATIVIDADE: atividadeId
        })
    }
    async function getItems() {
        const params = ["ID_ATIVIDADE", "NOME_ATIVIDADE"]
        return await database.getItems("ATIVIDADES", params);
    }
    async function remove({
        atividadeId
    }) {
        return await database.remove("ATIVIDADES", {
            ID_ATIVIDADE: atividadeId
        })
    }
    async function replace({
        atividadeId,
        ...atividade
    }) {
        return await database.replace("ATIVIDADES", atividade, {
            ID_ATIVIDADE: atividadeId
        })
    }
    async function update({
        atividadeId,
        ...atividade
    }) {
        return await database.update("ATIVIDADES", atividade, {
            ID_ATIVIDADE: atividadeId
        })
    }

}