class modelFactory {
  static insertModel(name, Model) {
    if (!modelFactory.models[name]) {
      modelFactory.models[name] = {};
    }

    modelFactory.models[name] = Model;
  }
  static getModel(name) {
    return modelFactory.models[name];
  }
}

modelFactory.models = {};

module.exports = modelFactory;
