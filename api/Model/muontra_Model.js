const Sequelize = require("sequelize");
const taikhoan = require("./taikhoan_Model");
const xedap = require("./xe_Model");
const db = require("../Config/db");

const muontra_Model = db.define("muontra", {
  MUONTRA_ID: {
    type: Sequelize.STRING,
    allowNull: false
  },
  TK_ID: {
    type: Sequelize.STRING,
    references: {
      model: taikhoan,
      key: "TK_ID"
    }
  },
  XE_ID: {
    type: Sequelize.STRING,
    references: {
      model: xedap,
      key: "XE_ID"
    }
  },
  MUON_THOIGIAN: {
    type: Sequelize.STRING
  },
  TRA_THOIGIAN: {
    type: Sequelize.STRING
  },
  MUON_VITRI: {
    type: Sequelize.STRING
  },
  TRA_VITRI: {
    type: Sequelize.STRING
  }
});

db.sync();
module.exports = muontra_Model;
