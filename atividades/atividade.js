const requiredParam = require('../helpers/required-param')

const {
    InvalidPropertyError
} = require('../helpers/errors')

module.exports = function makeAtividade(
    atividadeInfo = requiredParam('atividadeInfo')
) {

    validate(atividadeInfo)
    const normalAtividade = normalize(atividadeInfo)
    return Object.freeze(normalAtividade)

    function validate({
        NOME_ATIVIDADE = requiredParam('NOME_ATIVIDADE'),
        ...otherInfo
    } = {}) {
        validateName('NOME_ATIVIDADE', NOME_ATIVIDADE)

        return {
            NOME_ATIVIDADE,
            ...otherInfo
        }
    }

    function validateName(label, name) {
        if (name.length < 2) {
            throw new InvalidPropertyError(`O nome ${nome} tem que ter mais de 2 caracteres`)
        }
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