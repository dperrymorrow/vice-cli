"use strict";

const Store = require("data-store");
const store = new Store({ path: __dirname + "/../.vice-data.json" });

module.exports = {
  fetch() {
    return store.get("vices") || [];
  },

  save(vices) {
    store.set("vices", vices);
    store.save();
  }
};
