const makeVoluntario = require("./voluntario");
const { UniqueConstraintError } = require("../helpers/errors");

module.exports = function makeVoluntarioList({ database }) {
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
          let itemToPush = makeVoluntario(item);
          output.push(itemToPush);
        });
      } else {
        let itemToPush = makeVoluntario(items);
        output.push(itemToPush);
      }
    }

    return output;
  }

  async function add(voluntarioInfo) {
    try {
      let voluntario = makeVoluntario(voluntarioInfo);
      return await database.add("voluntario", voluntario);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function findByItems({ max, searchParams }) {
    try {
      let voluntario = await database.findByItems(
        "voluntario",
        max,
        searchParams
      );

      let voluntarios = formatOutput(voluntario);
      return voluntarios;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function getItems({ max }) {
    try {
      let items = await database.getItems("voluntario", max);

      let voluntarios = formatOutput(items);
      return voluntarios;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function remove(searchParams) {
    try {
      return await database.remove("voluntario", searchParams);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function replace({ searchParams, voluntario }) {
    try {
      return await database.replace("voluntario", voluntario, searchParams);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function update({ searchParams, voluntario }) {
    try {
      return await database.update("voluntario", voluntario, searchParams);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
