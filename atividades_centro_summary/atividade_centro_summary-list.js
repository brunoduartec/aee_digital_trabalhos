const makeAtividadeCentroSummary = require("./atividade_centro_summary");
const { UniqueConstraintError } = require("../helpers/errors");

module.exports = function makeAtividadeCentroSummaryList({ database }) {
  return Object.freeze({
    add,
    findByItems,
    getItems,
    remove,
    replace,
    update,
  });

  function formatOutput(items) {
    let output = [];

    if (items) {
      if (items.length > 0) {
        items.forEach((item) => {
          let itemToPush = makeAtividadeCentroSummary(item);
          output.push(itemToPush);
        });
      }
    }

    return output;
  }

  async function add(atividade_centro_summaryInfo) {
    try {
      let atividade_centro_summary = makeAtividadeCentroSummary(
        atividade_centro_summaryInfo
      );
      return await database.add(
        "atividade_centro_summary",
        atividade_centro_summary
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function findByItems({ max, searchParams }) {
    try {
      let atividade_centro_summary = await database.findByItems(
        "atividade_centro_summary",
        max,
        searchParams
      );

      atividade_centro_summary = formatOutput(atividade_centro_summary);
      return atividade_centro_summary;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function getItems({ max }) {
    try {
      let items = await database.getItems("atividade_centro_summary", max);

      let atividade_centro_summarys = formatOutput(items);
      return atividade_centro_summarys;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function remove(searchParams) {
    try {
      return await database.remove("atividade_centro_summary", searchParams);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function replace({ searchParams, atividade_centro_summary }) {
    try {
      return await database.replace(
        "atividade_centro_summary",
        atividade_centro_summary,
        searchParams
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function update({ searchParams, atividade_centro_summary }) {
    try {
      return await database.update(
        "atividade_centro_summary",
        atividade_centro_summary,
        searchParams
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
