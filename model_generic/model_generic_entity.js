const requiredParam = require("../helpers/required-param");
let ModelFactory = require("../db/modelFactory");

module.exports = function makeGenericEntity(
  info = requiredParam("info"),
  modelName = requiredParam("modelName")
) {
  let items = {};
  try {
    const model = ModelFactory.getModel(modelName);
    const schemaItems = model.schema.obj;
  
    
  
    let keys = Object.keys(schemaItems);
  
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const element = schemaItems[key];
      const item = info[key];
      if (element.require) {
        items[key] = info[key] ? item : requiredParam(key);
      } else {
        items[key] = item;
      }
    }
  
    items["ID"] = info["_id"];
  
    return items;
  } catch (error) {

    return items
  }


};
