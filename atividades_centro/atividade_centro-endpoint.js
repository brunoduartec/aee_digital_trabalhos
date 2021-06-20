const {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError,
} = require("../helpers/errors");
const makeHttpError = require("../helpers/http-error");
const makeAtividadeCentro = require("./atividade_centro");

module.exports = function makeAtividadeCentroEndpointHandler({
  atividade_centroList,
}) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case "POST":
        return post(httpRequest);
        break;
      case "GET":
        return get(httpRequest);
        break;
      case "DELETE":
        return remove(httpRequest);
        break;
      case "PUT":
        return update(httpRequest);
        break;

      default:
        let errorMessage = `${httpRequest.method} method not allowed.`;
        console.log(errorMessage);

        return makeHttpError({
          statusCode: 405,
          errorMessage: errorMessage,
        });
        break;
    }
  };

  function formatSearchParam(id, params) {
    let searchParams;
    if (id) {
      searchParams = {
        id: id,
      };
    } else if (Object.keys(params).length > 0) {
      searchParams = params;
    }

    return searchParams;
  }

  async function get(httpRequest) {
    const { id } = httpRequest.pathParams || {};
    const { max, ...params } = httpRequest.queryParams || {};

    let searchParams = formatSearchParam(id, params);
    let hasParams = searchParams != null;
    let result = [];

    if (hasParams) {
      result = await atividade_centroList.findByItems({
        max,
        searchParams,
      });
    } else {
      result = await atividade_centroList.getItems({
        max,
      });
    }

    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      data: JSON.stringify(result),
    };
  }

  async function post(httpRequest) {
    let atividade_centroInfo = httpRequest.body;
    if (!atividade_centroInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No POST body",
      });
    }

    if (typeof httpRequest.body == "string") {
      try {
        atividade_centroInfo = JSON.parse(atividade_centroInfo);
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: "Bad request. POST body must be valid JSON.",
        });
      }
    }

    try {
      const atividade_centro = makeAtividadeCentro(atividade_centroInfo);
      const result = await atividade_centroList.add(atividade_centro);
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        data: JSON.stringify(result),
      };
    } catch (e) {
      return makeHttpError({
        errorMessage: e.message,
        statusCode:
          e instanceof UniqueConstraintError
            ? 409
            : e instanceof InvalidPropertyError ||
              e instanceof RequiredParameterError
            ? 400
            : 500,
      });
    }
  }

  async function remove(httpRequest) {
    const { id } = httpRequest.pathParams || {};
    const { max, ...params } = httpRequest.queryParams || {};

    let searchParams = formatSearchParam(id, params);

    const result = await atividade_centroList.remove(searchParams);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      data: JSON.stringify(result),
    };
  }

  async function update(httpRequest) {
    const { id } = httpRequest.pathParams || {};
    const { max, ...params } = httpRequest.queryParams || {};

    let searchParams = formatSearchParam(id, params);

    let atividade_centroInfo = httpRequest.body;
    if (!atividade_centroInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No PUT body",
      });
    }

    if (typeof httpRequest.body == "string") {
      try {
        atividade_centroInfo = JSON.parse(atividade_centroInfo);
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: "Bad request. PUT body must be valid JSON.",
        });
      }
    }

    try {
      atividade_centroInfo.atividade_centroId = id;
      const result = await atividade_centroList.update({
        searchParams: searchParams,
        atividade_centro: atividade_centroInfo,
      });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        data: JSON.stringify(result),
      };
    } catch (e) {
      return makeHttpError({
        errorMessage: e.message,
        statusCode:
          e instanceof UniqueConstraintError
            ? 409
            : e instanceof InvalidPropertyError ||
              e instanceof RequiredParameterError
            ? 400
            : 500,
      });
    }
  }
};
