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
        ID_CENTRO = requiredParam('ID_CENTRO'),
        ID_ATIVIDADE = requiredParam('ID_ATIVIDADE'),
        DIA_SEMANA = requiredParam('DIA_SEMANA'),
        ...otherInfo
    } = {}) {
        validateDiaDaSemana(DIA_SEMANA)

        return {
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