const Sequelize = require("sequelize");
const db = require("./../Config/db");
const taikhoan = require("./taikhoan_Model");
const xedap = require("./xe_Model");

const huhong_Model = db.define("huhong", {
  HH_ID: {
    type: Sequelize.STRING,
    primaryKey: true,
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
  HH_MOTA: {
    type: Sequelize.STRING
  },
  HH_TRANGTHAI: {
    type: Sequelize.STRING
  },
  HH_THOIGIAN: {
    type: Sequelize.STRING
  }
});

db.sync();
module.exports = huhong_Model;
