// var mongodb = require('mongodb');
const logger = require("../helpers/logger");

const commonHelper = require("../helpers/common.helper")


const Cache = require("../helpers/cache");
const cache = new Cache();


module.exports = function makeDb(ModelFactory) {
  return Object.freeze({
    add,
    findByItems,
    getItems,
    remove,
    replace,
    update,
  });

  function formatFieldParams(fieldParams){
    let paramsParsed = {}

    for (let index = 0; index < fieldParams.length; index++) {
      const element = fieldParams[index];
      paramsParsed[element] = 1
    }

    return paramsParsed
  }
  function formatParams(searchParams) {
    let items = Object.keys(searchParams);
    let values = Object.values(searchParams);

    searchParams = {};
    for (let index = 0; index < items.length; index++) {
      let item = items[index];
      const value = values[index];
      if (item == "ID" || item == "id") {
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

  // function formatParams(searchParams) {
  //   try {
  //     let items = Object.keys(searchParams);
  //     let values = Object.values(searchParams);
  
  //     searchParams = {};
  //     for (let index = 0; index < items.length; index++) {
  //       let item = items[index];
  //       const value = values[index];
  //       if (item == "ID") {
  //         item = "_id";
  //       }
  
  //       if (item.toLocaleLowerCase().includes("_id")) {
  //         searchParams[item] = new mongodb.ObjectID(value.toString());
  //       } else {
  //         searchParams[item] = {
  //           $regex: value
  //         };
  //       }
  //     }
  //     logger.info(`Parsed: db:index:formatParams: ${searchParams}`)
  //     return searchParams;
  //   } catch (error) {
  //     logger.error(`db:index:formatParams ${error}`)
  //     throw error
  //   }
  // }

  function getParamsParsed(params) {
    let paramsParsed = "";
  
    let keys = Object.keys(params);
  
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const value = params[key];
  
      if (value) {
        paramsParsed = paramsParsed.concat(`&${key}=${decodeURIComponent(value)}`);
      }
    }
  
    logger.info(`getParamsParsed => ${paramsParsed.substring(1)}`);
  
    return paramsParsed.substring(1);
  }

  function populateItems(populateInfo) {
    try {
      let populateConcatTrimed;
      if (populateInfo && populateInfo.length > 0) {
        let populateConcat = "";
  
        for (let index = 0; index < populateInfo.length; index++) {
          const element = populateInfo[index];
          populateConcat = populateConcat.concat(` ${element}`);
        }
  
        populateConcatTrimed = populateConcat.trim();
      }

      logger.info(`Parsed: db:index:populateItems: ${populateInfo}`)
      return populateConcatTrimed;
      
    } catch (error) {
      logger.error(`db:index:populateItems ${error}`)
      throw error
    }
  }

  async function solveItem(item, schemaObj) {
    try {
      logger.info(`db:index:solveItem: ${item} : ${schemaObj}`)
      if (schemaObj.ref) {
        const ref = schemaObj.ref;
        if (typeof item === 'object') {
          const itemAdded = await add(ref, item);
          const id = itemAdded._id.toString();
          return id;
        } else {
          return item
        }
      }
      return item;
      
    } catch (error) {
      logger.error(`db:index:solveItem ${error}`)
      throw error
    }
  }

  function checkNotEnd(schemaObj) {
    let isEnd = schemaObj.type || schemaObj.ref;
    return !isEnd;
  }

  async function traverser(schemaObj, item) {
    try {
      logger.info(`db:index:traverser: ${item} : ${schemaObj}`)
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
      
    } catch (error) {
      logger.error(`db:index:traverser ${error}`)
      throw error
    }
  }

  async function add(modelName, itemInfo) {
    try {
      logger.info(`db:index:add: ${modelName} : ${itemInfo}`)
      if (typeof itemInfo != 'object')
        return;

      const Model = ModelFactory.getModel(modelName).model;
      const schema = ModelFactory.getModel(modelName).schema.obj;

      let itemInfoConverted = await traverser(schema, itemInfo);

      let item = new Model(itemInfoConverted);

      const saved = await item.save();

      return saved;
    } catch (error) {
      logger.error(`db:index:add: ${error}`)
      throw error;
    }
  }

  function getSubItem(m, queryParam) {
    try {
      logger.info(`db:index:getSubItem: ${JSON.stringify(m)} : ${queryParam}`)
      let paramsSplited = queryParam.split(".");
  
      let itemToSearch = m[paramsSplited[0]];
  
      if (itemToSearch && paramsSplited.length > 1) {
        itemToSearch = itemToSearch[paramsSplited[1]];
      }
      return itemToSearch
      
    } catch (error) {
      logger.error(`db:index:getSubItem: ${error}`)
      throw error;
    }
  }

  async function findByItems(modelName, params, fieldParams) {
    try {
      logger.info(`db:index:findByItems: ${modelName} : ${params}`)

      let paramsParsed = getParamsParsed(params)
      let cachedItem;

      if(fieldParams){
        cachedItem = await cache.get(`${modelName}:${paramsParsed}:${fieldParams}`);
        if(cachedItem)return JSON.parse(cachedItem)
      }else{
        cachedItem = await cache.get(`${modelName}:${paramsParsed}`);
        if (cachedItem){
          let  cacheParsed = JSON.parse(cachedItem);
          if(fieldParams){
            let fieldParamsParsed = formatFieldParams(fieldParams)
            cacheParsed = cacheParsed.map((m)=>{
              const item = {}
  
              fieldParamsParsed.forEach(field => {
                item[field] = m[field]
              });
              return item
            })

            cache.set(`${modelName}:${paramsParsed}:${fieldParams}`, cacheParsed);
            return cacheParsed

          }else{
            return cacheParsed
          }
        }
      }

      const modelInfo = ModelFactory.getModel(modelName);
      const Model = modelInfo.model;
      const populate = modelInfo.populate;

      let populateTags = populateItems(populate);

      let item

      if(fieldParams){
        let fieldParamsParsed = formatFieldParams(fieldParams)
        item = await Model.find(params).deepPopulate(populateTags).select(fieldParamsParsed).lean();
      }else{
        item = await Model.find(params).deepPopulate(populateTags).lean();
      }
   
      if(fieldParams){
        cache.set(`${modelName}:${paramsParsed}:${fieldParams}`, item);
      }
      else{
        cache.set(`${modelName}:${paramsParsed}`, item);
      }

      return item;
    } catch (error) {
      logger.error(`db:index:findByItems: ${error}`)
      throw error;
    }
  }

 async function getItems(modelName, fieldParams) {
    try {
      const modelInfo = ModelFactory.getModel(modelName);

      let cachedItem;

      if(fieldParams){
        cachedItem = await cache.get(`${modelName}:${fieldParams}`);
        if(cachedItem)return JSON.parse(cachedItem)
      }else{
        cachedItem = await cache.get(`${modelName}`);
        if (cachedItem){
          let  cacheParsed = JSON.parse(cachedItem);
          if(fieldParams){
            let fieldParamsParsed = formatFieldParams(fieldParams)
            cacheParsed = cacheParsed.map((m)=>{
              const item = {}
  
              fieldParamsParsed.forEach(field => {
                item[field] = m[field]
              });
              return item
            })

            cache.set(`${modelName}:${fieldParams}`, cacheParsed);
            return cacheParsed

          }else{
            return cacheParsed
          }
        }
      }

      const Model = modelInfo.model;
      const populate = modelInfo.populate;

      
      let populateTags = populateItems(populate);
      let items 
      
      if(fieldParams){
        let fieldParamsParsed = formatFieldParams(fieldParams)
        items = await Model.find().populate(populateTags).select(fieldParamsParsed);
      }
      else{
        items = await Model.find().populate(populateTags);
      }
      
      if (items && items.length > 0) {
        cache.set(`${modelName}`, items);
        return items;
      } else {
        return null;
      }
    } catch (error) {
      logger.error(`db:index:getItems: ${error}`)
      throw error;
    }
  }
  async function remove(modelName, conditions) {
    try {
      logger.info(`db:index:remove: ${modelName} : ${conditions}`)
      const ModelInfo = ModelFactory.getModel(modelName);
      const Model = ModelInfo.model;
      conditions = formatParams(conditions);
      const result = await Model.deleteOne(conditions);

      await cache.remove(`${modelName}*`)
      getItems(modelName);

      return result;
    } catch (error) {
      logger.error(`db:index:remove: ${error}`)
      throw error;
    }
  }
  async function replace(modelName, item, conditions) {
    try {
      logger.info(`db:index:replace: ${modelName} : ${item} : ${conditions}`)
      const ModelInfo = ModelFactory.getModel(modelName);
      const Model = ModelInfo.model;
      conditions = formatParams(conditions);
      const result = await Model.replaceOne(conditions, item);

      await cache.remove(`${modelName}*`)
      getItems(modelName);

      return result;
    } catch (error) {
      logger.error(`db:index:replace: ${error}`)
      throw error;
    }
  }
  async function update(modelName, item, conditions) {
    try {

      conditions = conditions || {}
      logger.info(`db:index:update: ${modelName} : ${item} : ${conditions}`)
      const ModelInfo = ModelFactory.getModel(modelName);
      const Model = ModelInfo.model;
      conditions = formatParams(conditions);

      const result = await Model.updateOne(conditions, item, {
        upsert: true
      });

      await cache.remove(`${modelName}*`)
      getItems(modelName);

      return result;
    } catch (error) {
      logger.error(`db:index:replace: ${error}`)
      throw error;
    }
  }
};