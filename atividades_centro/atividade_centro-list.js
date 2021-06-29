const makeAtividadeCentro = require("./atividade_centro");
const { UniqueConstraintError } = require("../helpers/errors");

module.exports = function makeAtividadeCentroList({ database }) {
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
          let itemToPush = makeAtividadeCentro(item);
          output.push(itemToPush);
        });
      } else {
        let itemToPush = makeAtividadeCentro(items);
        output.push(itemToPush);
      }
    }

    return output;
  }

  async function add(atividade_centroInfo) {
    try {
      let atividade_centro = makeAtividadeCentro(atividade_centroInfo);
      return await database.add("atividade_centro", atividade_centro);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function findByItems({ max, searchParams }) {
    try {
      let atividade_centro = await database.findByItems(
        "atividade_centro",
        max,
        searchParams
      );

      atividade_centro = formatOutput(atividade_centro);
      return atividade_centro;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function getItems({ max }) {
    try {
      let items = await database.getItems("atividade_centro", max);

      let atividade_centros = formatOutput(items);
      return atividade_centros;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function remove(searchParams) {
    try {
      return await database.remove("atividade_centro", searchParams);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function replace({ searchParams, atividade_centro }) {
    try {
      return await database.replace(
        "atividade_centro",
        atividade_centro,
        searchParams
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function update({ searchParams, atividade_centro }) {
    try {
      return await database.update(
        "atividade_centro",
        atividade_centro,
        searchParams
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
