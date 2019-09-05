const {
  Items,
  ItemsCategory,
  Jobs,
  Parameter,
} = require('../models/tables');
const json = require('./parameter.json');

async function insertData() {
  const mapJsonKeyToClass = {
    Items,
    ItemsCategory,
    Jobs,
    Parameter,
  };
  const promiseArray = Object.keys(json)
    .reduce((r, e) => json[e].map((obj) => mapJsonKeyToClass[e].create(obj)), []);
  return Promise.all(promiseArray);
}

module.exports = {
  insertData,
};
