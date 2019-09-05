const { insertData } = require('./data/insertData');
const { initTables } = require('./models/tables');
const { initDB } = require('./db/mysql');

async function init() {
  // 初始化数据库
  await initDB();
  // 初始化表
  await initTables();
  // 插入数据
  await insertData();
}

module.exports = {
  init,
};
