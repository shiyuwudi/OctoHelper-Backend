const express = require('express');
const { init } = require('./src/init');

const app = express();

// 初始化数据库和表
init();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('启动服务，监听端口3000!'));
