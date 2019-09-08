const { ItemsCategory } = require('../models/tables');

const service = {
  async read() {
    return ItemsCategory.findAll();
  },
};

module.exports = service;
