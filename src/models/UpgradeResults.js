const { UpgradeResultsModel } = require('./tables');

class UpgradeResults {
  static async list () {
    return await UpgradeResultsModel.findAll({
      order: [['updated', 'DESC']]
    });
  }
}

module.exports = exports = UpgradeResults;
