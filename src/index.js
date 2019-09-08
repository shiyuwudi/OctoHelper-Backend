const express = require('express');
const { init } = require('./init');
const api = require('./routes/api');
const { initLogger } = require('./utils/logger');
const logger = require('log4js').getLogger('[src/index]');

const app = express();

// 初始化数据库和表
init();

// 初始化日志
initLogger();

// 路由
app.use((req, res, next) => {
  logger.info(`[${req.method}] ${req.originalUrl}`);
  next();
});
app.get('/', (req, res) => res.send('Welcome to OctoHelper Service!'));
app.use('/api', api);

app.listen(3000, () => console.log('启动服务，监听端口3000!'));
