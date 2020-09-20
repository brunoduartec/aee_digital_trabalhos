const makeAtividadeCentro = require('./atividade_centro')
const {
    UniqueConstraintError
} = require('../helpers/errors')

module.exports = function makeAtividadeCentroList({
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
        atividadeCentroId,
        ...atividade
    }) {

        return await database.add("ATIVIDADES_CENTRO", atividade)
    }
    async function findById({
        atividadeCentroId
    }) {
        const params = ["ID_ATIVIDADE_CENTRO", "ID_CENTRO", "ID_ATIVIDADE", "HORINI", "HORFIM", "DIA_SEMANA", "NUMERO_TURMA"]
        return await database.findById("ATIVIDADES_CENTRO", params, {
            ID_ATIVIDADE_CENTRO: atividadeCentroId
        })
    }
    async function getItems() {
        const params = ["ID_ATIVIDADE_CENTRO", "ID_CENTRO", "ID_ATIVIDADE", "HORINI", "HORFIM", "DIA_SEMANA", "NUMERO_TURMA"]
        return await database.getItems("ATIVIDADES_CENTRO", params);
    }
    async function remove({
        atividadeCentroId
    }) {
        return await database.remove("ATIVIDADES_CENTRO", {
            ID_ATIVIDADE_CENTRO: atividadeCentroId
        })
    }
    async function replace({
        atividadeCentroId,
        ...atividade
    }) {
        return await database.replace("ATIVIDADES_CENTRO", atividade, {
            ID_ATIVIDADE_CENTRO: atividadeCentroId
        })
    }
    async function update({
        atividadeCentroId,
        ...atividade
    }) {
        return await database.update("ATIVIDADES_CENTRO", atividade, {
            ID_ATIVIDADE_CENTRO: atividadeCentroId
        })
    }
}