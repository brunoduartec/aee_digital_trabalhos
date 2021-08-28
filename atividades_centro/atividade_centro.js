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
    ATIVIDADE = requiredParam("ATIVIDADE"),
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
    ATIVIDADE,
    CENTRO_ID,
    HORINI,
    HORFIM,
    DIA_SEMANA,
    NUMERO_TURMA,
    ATUADORES_HABILITADOS,
    RECEPTORES,
    ATUADORES,
    COORDENADOR_ID,
    _id,
  }) {
    if (ATIVIDADE && ATIVIDADE.NOME_ATIVIDADE) {
      ATIVIDADE = {
        NOME_ATIVIDADE: ATIVIDADE.NOME_ATIVIDADE,
        RECEIVER_ALIAS: ATIVIDADE.RECEIVER_ALIAS,
        ATOR_ALIAS: ATIVIDADE.ATOR_ALIAS,
        COORDENADOR_ALIAS: ATIVIDADE.COORDENADOR_ALIAS,
      };
    }

    return {
      ATIVIDADE,
      CENTRO_ID,
      HORINI,
      HORFIM,
      DIA_SEMANA,
      NUMERO_TURMA,
      ATUADORES_HABILITADOS,
      RECEPTORES,
      ATUADORES,
      COORDENADOR_ID,
      ID: _id,
    };
  }
};
