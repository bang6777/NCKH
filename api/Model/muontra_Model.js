const Sequelize = require("sequelize");
const taikhoan = require("./taikhoan_Model");
const xedap = require("./xe_Model");
const db = require("../Config/db");

const muontra_Model = db.define("muontra", {
  MUONTRA_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  TK_ID: {
    type: Sequelize.STRING,
    references: {
      model: taikhoan,
      key: "TK_ID"
    }
  },
  // XE_ID: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: xedap,
  //     key: "XE_ID"
  //   }
  // },
  MUON_THOIGIAN: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  TRA_THOIGIAN: {
    type: Sequelize.DATE
  },
  MUON_VITRI_LAT: {
    type: Sequelize.DOUBLE,
    defaultValue: 0.0
  },
  MUON_VITRI_LNG: {
    type: Sequelize.DOUBLE,
    defaultValue: 0.0
  },
  TRA_VITRI_LAT: {
    type: Sequelize.DOUBLE,
    defaultValue: 0.0
  },
  TRA_VITRI_LNG: {
    type: Sequelize.DOUBLE,
    defaultValue: 0.0
  }
});

db.sync();
module.exports = muontra_Model;
