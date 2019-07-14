const Sequelize = require('sequelize');
const db = require('./../Config/db');
const muontra_Model = require('../Model/muontra_Model');

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

// // muontra_Model.belongsTo(taikhoan_Model, {foreignKey: 'TK_ID'});
// taikhoan_Model.hasMany(muontra_Model, { foreignKey: 'TK_ID' });
// muontra_Model.belongsTo(taikhoan_Model, { foreignKey: 'TK_ID' });
db.sync();
module.exports = taikhoan_Model;
