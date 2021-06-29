const requiredParam = require("../helpers/required-param");

const { InvalidPropertyError } = require("../helpers/errors");

module.exports = function makeAtividadeCentro(
  atividadeCentroInfo = requiredParam("atividadeCentroInfo")
) {
  validate(atividadeCentroInfo);
  const normalAtividadeCentro = normalize(atividadeCentroInfo);
  return Object.freeze(normalAtividadeCentro);

  function validate({
    CENTRO_ID = requiredParam("CENTRO_ID"),
    ATIVIDADE_ID = requiredParam("ATIVIDADE_ID"),
    DIA_SEMANA = requiredParam("DIA_SEMANA"),
    ...otherInfo
  } = {}) {
    validateDiaDaSemana(DIA_SEMANA);

    return {
      ...otherInfo,
    };
  }

  function validateDiaDaSemana(name) {
    return true;
  }

  //metodo usado para caso queiramos deixa alguma coisa tudo minusculo por exemplo
  function normalize({
    ATIVIDADE_ID,
    CENTRO_ID,
    HORINI,
    HORFIM,
    DIA_SEMANA,
    NUMERO_TURMA,
    _id,
  }) {
    return {
      ATIVIDADE_ID,
      CENTRO_ID,
      HORINI,
      HORFIM,
      DIA_SEMANA,
      NUMERO_TURMA,
      ID: _id,
    };
  }
};
