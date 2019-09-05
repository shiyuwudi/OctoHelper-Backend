const path = require('path');
const fs = require('fs');
const moment = require('moment');
const logger = require('../logger').getLogger('模块实体类');

const { tfsSettings } = require('../utils/settings');
const { ModulesModel } = require('../models/tables');
const { getYumInfo } = require('../lib/shell');

class Modules {
  static async loadComponent () {
    const result = [];
    try {
      const componentJsonPath = path.join(tfsSettings.DATA_PATH, 'component.json');
      const componentList = JSON.parse(fs.readFileSync(componentJsonPath) + '');
      await ModulesModel.destroy({
        where: {},
        truncate: true
      });
      for (const component in componentList) {
        const { type, label, self } = componentList[component];
        const version = getYumInfo(component, 'Version');
        let releaseTime = getYumInfo(component, 'Summary');
        if (version) {
          releaseTime = moment(releaseTime).toISOString();
          const updateTime = moment().toISOString();
          logger.info('version', version, 'releaseTime', releaseTime, 'updateTime', updateTime);
          await ModulesModel.create({
            name: component,
            version,
            enable: 1,
            type,
            label,
            'self': self ? 1 : 0,
            releaseTime,
            updateTime,
          });
          result.push({ name: component, version });
        }
      }
    } catch (e) {
      logger.error('Error: database error: ', e.message);
    }
    return result;
  }
  static async list () {
    return await ModulesModel.findAll();
  }
}

module.exports = {
  Modules
};
