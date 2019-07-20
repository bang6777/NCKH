const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const db = require("./../Config/db");
const muontra_Model = require("../Model/muontra_Model");
const huhong_Model = require("../Model/huhong_Model");
const vipham_Model = require("../Model/vipham_Model");
const xe_Model = require("./xe_Model");


const taikhoan_Model = db.define('taikhoan', {
  // attributes
  TK_ID: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  TK_PASSWORD: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  TK_HOTEN: {
    type: Sequelize.STRING,
  },
  TK_QUYEN: {
    type: Sequelize.STRING,
  },
  TK_DONVI: {
    type: Sequelize.STRING
  },
  TK_LOAI: {
    type: Sequelize.STRING
  },
  TK_HIEULUC: {
    type: Sequelize.STRING
  }
});

// muontra_Model.belongsTo(taikhoan_Model, {foreignKey: 'TK_ID'});
taikhoan_Model.hasMany(muontra_Model, { foreignKey: "TK_ID" });
muontra_Model.belongsTo(taikhoan_Model, { foreignKey: "TK_ID" });

xe_Model.hasMany(muontra_Model, { as: 'muontra', foreignKey: 'XE_ID' });

muontra_Model.belongsTo(xe_Model, { foreignKey: 'XE_ID' });

//tai khoan - hu hong
taikhoan_Model.hasMany(huhong_Model, { foreignKey: "TK_ID" });
huhong_Model.belongsTo(taikhoan_Model, { foreignKey: "TK_ID" });

//tai khoan - vi pham
taikhoan_Model.hasMany(vipham_Model, { foreignKey: "TK_ID" });
vipham_Model.belongsTo(taikhoan_Model, { foreignKey: "TK_ID" });

db.sync();
module.exports = taikhoan_Model;
