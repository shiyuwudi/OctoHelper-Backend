const { Items } = require('../models/tables');

const itemsService = {
  async read(cate_id) {
    if (!cate_id) {
      return Items.findAll();
    }
    return Items.findAll({
      where: {
        category_id: cate_id,
      },
    });
  },
};

module.exports = itemsService;
