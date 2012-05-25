var MemoryStore, S4, guid;
S4 = function() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
guid = function() {
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
};
MemoryStore = (function() {
  function MemoryStore(db) {
    this.db = db;
    this.store = {};
  }
  MemoryStore.prototype.create = function(model) {
    if (model.attributes.apiid) {
      model.id = model.attributes.id = model.attributes.apiid;
    } else {
      model.id = model.attributes.id = guid();
    }
    return this.store[model.id] = model;
  };
  MemoryStore.prototype.update = function(model) {
    if (model.id) {
      return this.store[model.id] = model;
    }
  };
  MemoryStore.prototype.destroy = function(model) {
    var id;
    id = model.id || model.attributes.id;
    return this.store[id] = void 0;
  };
  MemoryStore.prototype.find = function(model) {
    var id;
    id = model.id || model.attributes.id;
    return this.store[id];
  };
  MemoryStore.prototype.findAll = function(model) {
    var all, key, value;
    return all = (function() {
      var _ref, _results;
      _ref = this.store;
      _results = [];
      for (key in _ref) {
        value = _ref[key];
        _results.push(value);
      }
      return _results;
    }).call(this);
  };
  return MemoryStore;
})();
Backbone.memorySync = function(method, model, options) {
  var result, store;
  store = model.store || model.collection.store;
  if (!store) {
    console.warn("[BACKBONE-MEMORY] model without store object -> ", model);
    return;
  }
  result = (function() {
    switch (method) {
      case "read":
        if (model.id) {
          return store.find(model);
        } else {
          return store.findAll(model);
        }
        break;
      case "create":
        return store.create(model);
      case "update":
        return store.update(model);
      case "delete":
        return store.destroy(model);
      default:
        return nil;
    }
  })();
  if (result) {
    return options.success(result);
  }
};
window.Store = MemoryStore;
Backbone.ajaxSync = Backbone.sync;
Backbone.sync = Backbone.memorySync;