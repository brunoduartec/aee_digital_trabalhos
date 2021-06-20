module.exports = function makeDb(ModelFactory) {
  return Object.freeze({
    add,
    findByItems,
    getItems,
    remove,
    replace,
    update,
  });

  function formatParams(searchParams) {
    let items = Object.keys(searchParams);
    let values = Object.values(searchParams);

    searchParams = {};
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      const value = values[index];
      if (item == "ID") {
        item = "_id";
      }

      if (item.toLocaleLowerCase().includes("_id")) {
        searchParams[item] = { value };
      } else {
        searchParams[item] = { $regex: value };
      }
    }

    return searchParams;
  }

  async function add(modelName, pessoaInfo) {
    try {
      const Model = ModelFactory.getModel(modelName);
      pessoa = new Model(pessoaInfo);

      await pessoa.save();
    } catch (error) {
      throw error;
    }
  }
  async function findByItems(modelName, max, params) {
    try {
      const Model = ModelFactory.getModel(modelName);
      params = formatParams(params);
      let item = await Model.findOne(params);

      return item;
    } catch (error) {
      throw error;
    }
  }
  async function getItems(modelName, max) {
    try {
      const Model = ModelFactory.getModel(modelName);
      let items = await Model.find();

      if (items.length > 0) {
        return items;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
  async function remove(modelName, conditions) {
    try {
      const Model = ModelFactory.getModel(modelName);
      conditions = formatParams(conditions);
      const result = await Model.deleteOne(conditions);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async function replace(modelName, item, conditions) {
    try {
      const Model = ModelFactory.getModel(modelName);
      conditions = formatParams(conditions);
      const result = await Model.replaceOne(conditions, item);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async function update(modelName, item, conditions) {
    try {
      const Model = ModelFactory.getModel(modelName);
      conditions = formatParams(conditions);
      const result = await Model.updateOne(conditions, item);
      return result;
    } catch (error) {
      throw error;
    }
  }
};
