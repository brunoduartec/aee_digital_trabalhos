const {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError,
} = require("../helpers/errors");
const makeHttpError = require("../helpers/http-error");
const makeVoluntario = require("./voluntario");

module.exports = function makeVoluntarioEndpointHandler({ voluntarioList }) {
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
      result = await voluntarioList.findByItems({
        max,
        searchParams,
      });
    } else {
      result = await voluntarioList.getItems({
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
    let voluntarioInfo = httpRequest.body;
    if (!voluntarioInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No POST body",
      });
    }

    if (typeof httpRequest.body == "string") {
      try {
        voluntarioInfo = JSON.parse(voluntarioInfo);
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: "Bad request. POST body must be valid JSON.",
        });
      }
    }

    try {
      const itemAdded = await voluntarioList.add(voluntarioInfo);
      const result = makeVoluntario(itemAdded);
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

    const result = await voluntarioList.remove(searchParams);
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

    let voluntarioInfo = httpRequest.body;
    if (!voluntarioInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No PUT body",
      });
    }

    if (typeof httpRequest.body == "string") {
      try {
        voluntarioInfo = JSON.parse(voluntarioInfo);
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: "Bad request. PUT body must be valid JSON.",
        });
      }
    }

    try {
      voluntarioInfo.voluntarioId = id;
      const result = await voluntarioList.update({
        searchParams: searchParams,
        voluntario: voluntarioInfo,
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
