const mysql = require('mysql');
const { database, ...opts } = require('../configs').db.mysql;

function query(sql) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(opts);
    connection.connect();
    connection.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
    connection.end();
  });
}

async function initDB() {
  const sql1 = `DROP DATABASE ${database}`;
  const sql2 = `CREATE DATABASE IF NOT EXISTS ${database}`;
  try {
    await query(sql1);
  } catch (e) {
    //
  }
  try {
    await query(sql2);
    console.log('[初始化]数据库初始化成功');
  } catch (e) {
    console.log('[初始化]数据库初始化失败');
  }
}

module.exports = {
  initDB,
};
