const requiredParam = require('../helpers/required-param')

const {
    InvalidPropertyError
} = require('../helpers/errors')

module.exports = function makeAtividadeCentro(
    atividadeCentroInfo = requiredParam('atividadeCentroInfo')
) {

    validate(atividadeCentroInfo)
    const normalAtividadeCentro = normalize(atividadeCentroInfo)
    return Object.freeze(normalAtividadeCentro)

    function validate({
        ID_ATIVIDADE_CENTRO = requiredParam('ID_ATIVIDADE_CENTRO'),
        ID_CENTRO = requiredParam('ID_CENTRO'),
        ID_ATIVIDADE = requiredParam('ID_ATIVIDADE'),
        ...otherInfo
    } = {}) {
        validateDiaDaSemana(DIA_SEMANA)

        return {
            NOME_ATIVIDADE,
            ...otherInfo
        }
    }

    function validateDiaDaSemana(name) {
        return true;
    }


    //metodo usado para caso queiramos deixa alguma coisa tudo minusculo por exemplo
    function normalize({
        ...otherInfo
    }) {
        return {
            ...otherInfo
        }
    }
}