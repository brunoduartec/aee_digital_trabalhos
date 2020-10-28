const {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError
} = require('../helpers/errors')
const makeHttpError = require('../helpers/http-error')
const makeAtividadeCentro = require('./atividade_centro')

module.exports = function makeAtividadeCentroEndpointHandler({
    atividadeCentroList
}) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
            case 'POST':
                return postAtividadeCentro(httpRequest)
                break;
            case 'GET':
                return getAtividadeCentros(httpRequest)
                break;
            case 'DELETE':
                return removeAtividadeCentro(httpRequest)
                break;
            case 'PUT':
                return updateAtividadeCentro(httpRequest)
                break;

            default:
                return makeHttpError({
                    statusCode: 405,
                    errorMessage: `${httpRequest.method} method not allowed.`
                })
                break;
        }
    }

    async function getAtividadeCentros(httpRequest) {
        const {
            id
        } = httpRequest.pathParams || {}
        const {
            max,
            searchParam,
            searchValue
        } = httpRequest.queryParams || {}

        let hasQuery = function (id, searchParam, searchValue) {
            return id || (searchParam && searchValue)
        }
        let searchParamConverted
        if (searchParam) {
            searchParamConverted = Number(searchParam)
            searchParamConverted = convertSearchParam(searchParamConverted);
        }

        const result = hasQuery(id, searchParamConverted, searchValue) ? await atividadeCentroList.findById({
            atividadeCentroId: id,
            max,
            searchParam: searchParamConverted,
            searchValue
        }) : await atividadeCentroList.getItems({
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

    async function postAtividadeCentro(httpRequest) {
        let atividadeCentroInfo = httpRequest.body
        if (!atividadeCentroInfo) {
            return makeHttpError({
                statusCode: 400,
                errorMessage: 'Bad request. No POST body'
            })
        }

        if (typeof httpRequest.body == 'string') {
            try {
                atividadeCentroInfo = JSON.parse(atividadeCentroInfo)
            } catch {
                return makeHttpError({
                    statusCode: 400,
                    errorMessage: 'Bad request. POST body must be valid JSON.'
                })
            }
        }

        try {
            const atividadeCentro = makeAtividadeCentro(atividadeCentroInfo)
            const result = await atividadeCentroList.add(atividadeCentro)
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

    async function removeAtividadeCentro(httpRequest) {
        const {
            id
        } = httpRequest.pathParams || {}
        const result = await atividadeCentroList.remove({
            atividadeCentroId: id
        })
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            data: JSON.stringify(result)
        }
    }

    async function updateAtividadeCentro(httpRequest) {
        const {
            id
        } = httpRequest.pathParams || {}
        let atividadeCentroInfo = httpRequest.body
        if (!atividadeCentroInfo) {
            return makeHttpError({
                statusCode: 400,
                errorMessage: 'Bad request. No PUT body'
            })
        }

        if (typeof httpRequest.body == 'string') {
            try {
                atividadeCentroInfo = JSON.parse(atividadeCentroInfo)
            } catch {
                return makeHttpError({
                    statusCode: 400,
                    errorMessage: 'Bad request. PUT body must be valid JSON.'
                })
            }
        }

        try {
            atividadeCentroInfo.atividadeCentroId = id
            const result = await atividadeCentroList.update(atividadeCentroInfo)
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
    function convertSearchParam(searchParam) {
        switch (searchParam) {
            case (1):
                return {
                    "param":"ID_ATIVIDADE",
                    "type": "="
                }
            case (2):
                return {
                    "param":"ID_CENTRO",
                    "type": "like"
                }
            default:
                return null;
        };
    }

}