const makeModelGeneric = require("./model_generic_entity");
const logger = require("../helpers/logger");

module.exports = function makeModelGenericList({ database, modelName }) {
  return Object.freeze({
    add,
    findByItems,
    getItems,
    remove,
    replace,
    update,
  });

  function formatOutput(items) {
    if (items) {
      if (items.length > 0) {
        items.forEach((item) => {
          item["ID"] = item["_id"];
          delete item._id
        });
      }
    }

    return items;
  }

  async function add(model_genericInfo) {
    try {
      let model_generic = makeModelGeneric(model_genericInfo, modelName);
      let added = await database.add(modelName, model_generic);

      return added
    } catch (error) {
      logger.error(`model_generic:model_generic-list:add: ${error}`)
      throw error;
    }
  }
  async function findByItems({ searchParams, fields }) {
    try {
      let model_generic_info = await database.findByItems(
        modelName,
        searchParams,
        fields
      );

      model_generic_info = formatOutput(model_generic_info);
      return model_generic_info;
    } catch (error) {
      logger.error(`model_generic:model_generic-list:findByItems: ${error}`)
      throw error;
    }
  }
  async function getItems({ fields }) {
    try {
      let items = await database.getItems(modelName, fields);

      let model_generics_info = formatOutput(items);
      return model_generics_info;
    } catch (error) {
      logger.error(`model_generic:model_generic-list:getItems: ${error}`)
      throw error;
    }
  }
  async function remove(searchParams) {
    try {
      return await database.remove(modelName, searchParams);
    } catch (error) {
      logger.error(`model_generic:model_generic-list:remove: ${error}`)
      throw error;
    }
  }
  async function replace({ searchParams, model_generic_info }) {
    try {
      return await database.replace(
        modelName,
        model_generic_info,
        searchParams
      );
    } catch (error) {
      logger.error(`model_generic:model_generic-list:replace: ${error}`)
      throw error;
    }
  }
  async function update({ searchParams, model_generic_info }) {
    try {
      return await database.update(modelName, model_generic_info, searchParams);
    } catch (error) {
      logger.error(`model_generic:model_generic-list:update: ${error}`)
      throw error;
    }
  }
};
