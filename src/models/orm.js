const Sequelize = require('sequelize');
const {
  host, user, password, database, port,
} = require('../configs').db.mysql;

const orm = (() => {
  const map = {};
  /**
   * 单例
   * @return Sequelize
   */
  function getInstance(db) {
    const dbName = db || database;
    let unique = map[dbName];
    if (unique === undefined) {
      unique = new Sequelize(`mysql://${user}:${password}@${host}:${port}/${dbName}`, {
        logging: false,
        pool: {
          max: 100,
          min: 0,
          idle: 5000,
        },
      });
    }
    return unique;
  }
  return {
    getInstance,
  };
})();

module.exports = orm;
