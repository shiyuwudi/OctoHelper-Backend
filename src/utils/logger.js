const log4js = require('log4js');

function initLogger() {
  log4js.configure({
    appenders: {
      console: { type: 'console' },
      file: { type: 'file', filename: 'access.log' },
    },
    categories: {
      default: { appenders: ['console', 'file'], level: 'info' },
      // cheese: { appenders: ['file'], level: 'info' },
      // models: { appenders: ['console'], level: 'info' },
    },
  });
}

module.exports = {
  initLogger,
};
