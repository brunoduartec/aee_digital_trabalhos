const requiredParam = require("../helpers/required-param");

const { InvalidPropertyError } = require("../helpers/errors");

module.exports = function makeAtividadeCentro(
  atividadeCentroSummaryInfo = requiredParam("atividadeCentroSummaryInfo")
) {
  validate(atividadeCentroSummaryInfo);
  const normalAtividadeCentroSummary = normalize(atividadeCentroSummaryInfo);
  return Object.freeze(normalAtividadeCentroSummary);

  function validate({
    CENTRO_ID = requiredParam("CENTRO_ID"),
    ...otherInfo
  } = {}) {
    return {
      ...otherInfo,
    };
  }

  function mapParticipantes(atuadores) {
    return {
      TIPO: atuadores.TIPO,
      QUANTIDADE: atuadores.QUANTIDADE,
    };
  }

  //metodo usado para caso queiramos deixa alguma coisa tudo minusculo por exemplo
  function normalize({
    CENTRO_ID,
    ATUADORES_HABILITADOS,
    RECEPTORES,
    ATUADORES,
    _id,
  }) {
    if (ATUADORES_HABILITADOS && ATUADORES_HABILITADOS.length > 0) {
      ATUADORES_HABILITADOS = ATUADORES_HABILITADOS.map(mapParticipantes);
    }
    if (RECEPTORES && RECEPTORES.length > 0) {
      RECEPTORES = RECEPTORES.map(mapParticipantes);
    }

    if (ATUADORES && ATUADORES.length > 0) {
      ATUADORES = ATUADORES.map(mapParticipantes);
    }

    return {
      CENTRO_ID,
      ATUADORES_HABILITADOS,
      RECEPTORES,
      ATUADORES,
      ID: _id,
    };
  }
};
