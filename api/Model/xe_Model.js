const Sequelize = require("sequelize");
const muontra_Model = require("../Model/muontra_Model");
const db = require("../Config/db");

const xe_Model = db.define("xe", {
  // attributes
  XE_ID: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  XE_TRANGTHAI: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  XE_VITRI: {
    type: Sequelize.STRING
  },
  XE_NAMSANXUAT: {
    type: Sequelize.STRING
  },
  XE_GHICHU: {
    type: Sequelize.STRING
  }
});

//xe - muon tra
// xe_M.hasMany(muontra_M, { foreignKey: "XE_ID" });
muontra_Model.belongsTo(xe_Model, { foreignKey: "XE_ID" });

db.sync();
module.exports = xe_Model;
