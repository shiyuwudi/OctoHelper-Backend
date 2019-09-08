const { Jobs } = require('../models/tables');

const service = {
  async read() {
    return Jobs.findAll();
  },
};

module.exports = service;
