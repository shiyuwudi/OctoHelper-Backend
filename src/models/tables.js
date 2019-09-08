const orm = require('./orm');
const Sequelize = require('sequelize');

const {
  STRING, INTEGER, NOW, DATE,
} = Sequelize;

class Items extends Sequelize.Model {}
class ItemsCategory extends Sequelize.Model {} // 物品种类
class Jobs extends Sequelize.Model {} // 职业
class Parameter extends Sequelize.Model {} // 属性

// 获取orm单例
const sequelize = orm.getInstance();
const commonOptions = {
  sequelize,
  timestamps: false,
  underscored: true,
  paranoid: true,
  freezeTableName: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
};
// 建表

// 物品类别表
ItemsCategory.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    comment: '物品类别id',
  },
  name: {
    type: STRING,
    comment: '物品类别名称',
  },
  icon: {
    type: STRING,
    comment: '物品类别图标文件名（唯一）',
  },
  created_at: {
    type: DATE,
    defaultValue: NOW,
    comment: '创建时间',
  },
  can_equip_job_ids: {
    type: STRING,
    comment: '能够装备的职业id用英文逗号连接起来',
  },
}, {
  ...commonOptions,
  tableName: 'items_category',
});

// 职业表
Jobs.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    comment: '职业id',
  },
  name: {
    type: STRING,
    comment: '职业名称',
  },
  icon: {
    type: STRING,
    unique: true,
    comment: '职业图标文件名（唯一，应该是初期是这个职业的角色的头像）',
  },
  created_at: {
    type: DATE,
    defaultValue: NOW,
    comment: '创建时间',
  },
}, {
  ...commonOptions,
  tableName: 'jobs',
});

// 属性表 物攻，物防。。。
Parameter.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    comment: '量表id',
  },
  name: {
    type: STRING,
    comment: '量表名称',
  },
  desc: {
    type: STRING,
    comment: '量表描述',
  },
}, {
  ...commonOptions,
  tableName: 'parameter',
});

// 物品表（包含武器、防具和物品）。
Items.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    comment: '物品id',
  },
  created_at: {
    type: DATE,
    defaultValue: NOW,
    comment: '创建时间',
  },
  category_id: {
    type: INTEGER,
    allowNull: false,
    comment: '物品类别id',
    references: { // 关联到类别表
      model: ItemsCategory,
      key: 'id',
    },
  },
  name: {
    type: STRING,
    comment: '武器名称',
  },
  buy_price: {
    type: INTEGER,
    comment: '物品在商店购买时的价钱',
  },
  sell_price: {
    type: INTEGER,
    comment: '物品在商店卖出时的价钱',
  },
  phy_atk: {
    type: INTEGER,
    comment: '物攻',
  },
  atr_atk: {
    type: INTEGER,
    comment: '属攻',
  },
  buff: {
    type: STRING,
    comment: '增益',
  },
  rest_effects: {
    type: STRING,
    comment: '武器或者装备的其他效果',
  },
  get: {
    type: STRING,
    comment: '主要的获取方式（只包含文字）',
  },
  get_icon: {
    type: STRING,
    comment: '图标',
  },
  get_map_link: {
    type: STRING,
    comment: '地图连接',
  },
  effect: {
    type: STRING,
    comment: '物品效果',
  },
}, {
  ...commonOptions,
  tableName: 'weapons',
});

function initTables() {
  return new Promise((resolve, reject) => {
    // 建表
    sequelize.sync().then(() => {
      console.log('[初始化]表创建成功');
      resolve();
    }, (err) => {
      console.log('[初始化]表创建失败');
      reject(err);
    });
  });
}

module.exports = {
  initTables,
  Items,
  ItemsCategory,
  Jobs,
  Parameter,
};
