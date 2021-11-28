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
        searchParams[item] = value;
      } else {
        searchParams[item] = { $regex: value };
      }
    }

    return searchParams;
  }

  function populateItems(populateInfo) {
    let populateConcatTrimed;
    if (populateInfo && populateInfo.length > 0) {
      let populateConcat = "";

      for (let index = 0; index < populateInfo.length; index++) {
        const element = populateInfo[index];
        populateConcat = populateConcat.concat(` ${element}`);
      }

      populateConcatTrimed = populateConcat.trim();
    }
    return populateConcatTrimed;
  }

  async function solveItem(item, schemaObj) {
    if (schemaObj.ref) {
      const ref = schemaObj.ref;
      const itemAdded = await add(ref, item);
      const id = itemAdded._id.toString();
      return id;
    }
    return item;
  }

  function checkNotEnd(schemaObj) {
    let isEnd = schemaObj.type || schemaObj.ref;
    return !isEnd;
  }

  async function traverser(schemaObj, item) {
    let parsedItems = {};
    if (checkNotEnd(schemaObj)) {
      if (Array.isArray(schemaObj)) {
        const schemaElement = schemaObj[0];
        parsedItems = [];
        for (let index = 0; index < item.length; index++) {
          const sub_item = item[index];

          const item_to_add = await traverser(schemaElement, sub_item);
          parsedItems.push(item_to_add);
        }
      } else {
        const item_keys = Object.keys(schemaObj);
        for (let index = 0; index < item_keys.length; index++) {
          const sub_item_key = item_keys[index];
          const sub_item = item[sub_item_key];
          const schemaElement = schemaObj[sub_item_key];
          parsedItems[sub_item_key] = await traverser(schemaElement, sub_item);
        }
      }
    } else {
      return await solveItem(item, schemaObj);
    }

    return parsedItems;
  }

  async function add(modelName, itemInfo) {
    try {
      const Model = ModelFactory.getModel(modelName).model;
      const schema = ModelFactory.getModel(modelName).schema.obj;

      let itemInfoConverted = await traverser(schema, itemInfo);

      item = new Model(itemInfoConverted);

      return await item.save();
    } catch (error) {
      throw error;
    }
  }

  async function findByItems(modelName, max, params) {
    try {
      console.log("findByItems=>", params);
      const modelInfo = ModelFactory.getModel(modelName);
      const Model = modelInfo.model;
      const populate = modelInfo.populate;

      let items = Object.keys(params);
      let values = Object.values(params);

      let populateTags = populateItems(populate);

      let item = await Model.find({}).deepPopulate(populateTags);

      item = item.filter((m) => {
        let validate = true;

        for (let index = 0; index < items.length; index++) {
          const it = items[index];

          let paramsSplited = it.split(".");

          itemToSearch = m[paramsSplited[0]];

          if (paramsSplited.length > 1) {
            itemToSearch = itemToSearch[paramsSplited[1]];
          }

          validate =
            validate &&
            itemToSearch &&
            itemToSearch.toString().includes(values[index]);
        }

        return validate;
      });

      return item;
    } catch (error) {
      throw error;
    }
  }
  async function getItems(modelName, max) {
    try {
      const modelInfo = ModelFactory.getModel(modelName);

      const Model = modelInfo.model;
      const populate = modelInfo.populate;

      let populateTags = populateItems(populate);
      let items = await Model.find().deepPopulate(populateTags);

      if (items && items.length > 0) {
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
      const ModelInfo = ModelFactory.getModel(modelName);
      const Model = ModelInfo.model;
      conditions = formatParams(conditions);
      const result = await Model.deleteOne(conditions);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async function replace(modelName, item, conditions) {
    try {
      const ModelInfo = ModelFactory.getModel(modelName);
      const Model = ModelInfo.model;
      conditions = formatParams(conditions);
      const result = await Model.replaceOne(conditions, item);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async function update(modelName, item, conditions) {
    try {
      const ModelInfo = ModelFactory.getModel(modelName);
      const Model = ModelInfo.model;
      conditions = formatParams(conditions);

      const result = await Model.updateOne(conditions, item);

      return result;
    } catch (error) {
      throw error;
    }
  }
};
