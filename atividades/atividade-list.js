const makeAtividade = require("./atividade");
const { UniqueConstraintError } = require("../helpers/errors");

module.exports = function makeAtividadeList({ database }) {
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
          let itemToPush = makeAtividade(item);
          output.push(itemToPush);
        });
      } else {
        let itemToPush = makeAtividade(items);
        output.push(itemToPush);
      }
    }

    return output;
  }

  async function add(atividadeInfo) {
    try {
      let atividade = makeAtividade(atividadeInfo);
      return await database.add("atividade", atividade);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function findByItems({ max, searchParams }) {
    try {
      let atividade = await database.findByItems(
        "atividade",
        max,
        searchParams
      );

      let atividades = formatOutput(atividade);
      return atividades;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function getItems({ max }) {
    try {
      let items = await database.getItems("atividade", max);

      let atividades = formatOutput(items);
      return atividades;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function remove(searchParams) {
    try {
      return await database.remove("atividade", searchParams);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function replace({ searchParams, atividade }) {
    try {
      return await database.replace("atividade", atividade, searchParams);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function update({ searchParams, atividade }) {
    try {
      return await database.update("atividade", atividade, searchParams);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
