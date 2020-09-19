const {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError
} = require('../helpers/errors')
const makeHttpError = require('../helpers/http-error')
const makeAtividade = require('./atividade')

module.exports = function makeAtividadeEndpointHandler({
    atividadeList
}) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
            case 'POST':
                return postAtividade(httpRequest)
                break;
            case 'GET':
                return getAtividades(httpRequest)
                break;
            case 'DELETE':
                return removeAtividade(httpRequest)
                break;
            case 'PUT':
                return updateAtividade(httpRequest)
                break;

            default:
                return makeHttpError({
                    statusCode: 405,
                    errorMessage: `${httpRequest.method} method not allowed.`
                })
                break;
        }
    }

    async function getAtividades(httpRequest) {
        const {
            id
        } = httpRequest.pathParams || {}
        const {
            max
        } = httpRequest.queryParams || {}

        const result = id ? await atividadeList.findById({
            atividadeId: id
        }) : await atividadeList.getItems({
            max
        })

        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            data: JSON.stringify(result)
        }
    }

    async function postAtividade(httpRequest) {
        let atividadeInfo = httpRequest.body
        if (!atividadeInfo) {
            return makeHttpError({
                statusCode: 400,
                errorMessage: 'Bad request. No POST body'
            })
        }

        if (typeof httpRequest.body == 'string') {
            try {
                atividadeInfo = JSON.parse(atividadeInfo)
            } catch {
                return makeHttpError({
                    statusCode: 400,
                    errorMessage: 'Bad request. POST body must be valid JSON.'
                })
            }
        }

        try {
            const atividade = makeAtividade(atividadeInfo)
            const result = await atividadeList.add(atividade)
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 201,
                data: JSON.stringify(result)
            }

        } catch (e) {
            return makeHttpError({
                errorMessage: e.message,
                statusCode: e instanceof UniqueConstraintError ?
                    409 : e instanceof InvalidPropertyError ||
                    e instanceof RequiredParameterError ?
                    400 : 500
            })
        }
    }

    async function removeAtividade(httpRequest) {
        const {
            id
        } = httpRequest.pathParams || {}
        const result = await atividadeList.remove({
            atividadeId: id
        })
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            data: JSON.stringify(result)
        }
    }

    async function updateAtividade(httpRequest) {
        const {
            id
        } = httpRequest.pathParams || {}
        let atividadeInfo = httpRequest.body
        if (!atividadeInfo) {
            return makeHttpError({
                statusCode: 400,
                errorMessage: 'Bad request. No PUT body'
            })
        }

        if (typeof httpRequest.body == 'string') {
            try {
                atividadeInfo = JSON.parse(atividadeInfo)
            } catch {
                return makeHttpError({
                    statusCode: 400,
                    errorMessage: 'Bad request. PUT body must be valid JSON.'
                })
            }
        }

        try {
            atividadeInfo.atividadeId = id
            const result = await atividadeList.update(atividadeInfo)
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 200,
                data: JSON.stringify(result)
            }

        } catch (e) {
            return makeHttpError({
                errorMessage: e.message,
                statusCode: e instanceof UniqueConstraintError ?
                    409 : e instanceof InvalidPropertyError ||
                    e instanceof RequiredParameterError ?
                    400 : 500
            })
        }
    }

}