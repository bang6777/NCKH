const Sequelize = require("sequelize");
const db = require("./../Config/db");
const taikhoan = require("./taikhoan_Model");
const xedap = require("./xe_Model");
const sequelizePaginate = require('sequelize-paginate')

const huhong_Model = db.define("huhong", {
  HH_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  TK_ID: {
    type: Sequelize.STRING,
    references: {
      model: taikhoan,
      key: "TK_ID"
    }
  },
  XE_ID: {
    type: Sequelize.INTEGER,
    references: {
      model: xedap,
      key: "XE_ID"
    }
  },
  HH_MOTA: {
    type: Sequelize.STRING
  },
  HH_TRANGTHAI: {
    type: Sequelize.INTEGER,
    defaultValue: 1

  },
  HH_THOIGIAN:  { 
    type: Sequelize.DATE, 
    defaultValue: Sequelize.NOW 
  },
  HU_HONG_LAT: {
    type: Sequelize.DOUBLE,
    defaultValue: 0.0
  },
  HU_HONG_LNG: {
    type: Sequelize.DOUBLE,
    defaultValue: 0.0
  }
});

db.sync();
sequelizePaginate.paginate(huhong_Model);
module.exports = huhong_Model;
