const { schema } = require("./models/atividade_generic_form-model");

const ModelFactory = {
  getModel: function (modelName) {
    let models = {
      "atividade_generic_form-model": require("./models/atividade_generic_form-model"),
      "atividade_generic_quiz-model": require("./models/atividade_generic_quiz-model"),
      "atividade_generic_question-model": require("./models/atividade_generic_question-model"),
    };

    return models[modelName];
  },
};

function solveItem(item, schemaObj) {
  if (schemaObj.ref) {
    return "ID";
  }
  return item;
}

function solveSchemaElement(schemaObj, schemaElement) {
  if (schemaElement) {
    if (schemaElement.ref) {
      let ref = schemaElement.ref;
      return ModelFactory.getModel(`${ref}-model`).schema.obj;
    } else {
      return schemaElement;
    }
  } else {
    if (schemaObj.ref) {
      let ref = schemaObj.ref;
      return ModelFactory.getModel(`${ref}-model`).schema.obj;
    } else {
      return schemaObj;
    }
  }
}

function traverseItems(schemaObj, items) {
  let parsedItems = {};
  if (typeof items == "object") {
    if (Array.isArray(items)) {
      if (Array.isArray(schemaObj)) {
        schemaObj = schemaObj[0];
      }

      let elementArray = [];
      for (let i = 0; i < items.length; i++) {
        const element = items[i];
        const keys = Object.keys(element);
        const parsedElementItem = {};

        for (let j = 0; j < keys.length; j++) {
          const sub_element_key = keys[j];
          const sub_element = element[sub_element_key];
          const sub_element_schema = solveSchemaElement(
            schemaObj,
            schemaObj[sub_element_key]
          );
          parsedElementItem[sub_element_key] = traverseItems(
            sub_element_schema,
            sub_element
          );
        }
        elementArray.push(parsedElementItem);
      }
      return elementArray;
    } else {
      const keys = Object.keys(items);
      for (let index = 0; index < keys.length; index++) {
        const elementKey = keys[index];
        const element = items[elementKey];
        const schemaElement = solveSchemaElement(
          schemaObj,
          schemaObj[elementKey]
        );

        parsedItems[elementKey] = traverseItems(schemaElement, element);
      }
    }
  } else {
    return solveItem(items, schemaObj);
  }

  return parsedItems;
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

let items = {
  NAME: "Teste",
  PAGES: [
    {
      PAGE_NAME: "P_A",
      QUIZES: [
        {
          CATEGORY: "UM",
          QUESTIONS: [
            {
              QUESTION: "QUAL?",
              ANSWER_TYPE: "String",
              PRESET_VALUES: [],
            },
          ],
        },
      ],
    },
  ],
};

const model = ModelFactory.getModel("atividade_generic_form-model");

// traverseItems(model.schema.obj, items);
traverser(model.schema.obj, items);
