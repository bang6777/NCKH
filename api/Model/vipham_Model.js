const Sequelize = require("sequelize");
const db = require("../Config/db");
const muontra = require("./muontra_Model");
const loi = require("./loi_Model");

const vipham_Model = db.define("vipham", {
  VP_ID: {
    type: Sequelize.STRING,
    allowNull: false
  },
  MUONTRA_ID: {
    type: Sequelize.STRING,
    references: {
      model: muontra,
      key: "MUONTRA_ID"
    }
  },
  LOI_ID: {
    type: Sequelize.STRING,
    references: {
      model: loi,
      key: "LOI_ID"
    }
  },
  VP_THOIGIAN: {
    type: Sequelize.STRING
  }
});

db.sync();
module.exports = vipham_Model;
