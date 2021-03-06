const Sequelize = require("sequelize");
const db = require("../Config/db");
const muontra = require("./muontra_Model");
const loi = require("./loi_Model");
const taikhoan = require("./taikhoan_Model");
const xe = require("./xe_Model");
const sequelizePaginate = require("sequelize-paginate");

const vipham_Model = db.define("vipham", {
  VP_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  // MUONTRA_ID: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: muontra,
  //     key: "MUONTRA_ID"
  //   }
  // },
  // LOI_ID: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: loi,
  //     key: "LOI_ID"
  //   }
  // },
  // TK_ID: {
  //   type: Sequelize.STRING,
  //   references: {
  //     model: taikhoan,
  //     key: "TK_ID"
  //   }
  // },
  // XE_ID: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: xe,
  //     key: "XE_ID"
  //   }
  // },
  VP_THOIGIAN: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  VP_TRANGTHAI: {
    type: Sequelize.INTEGER,
    defaultValue: 0 //Chưa xử lý vi phạm
  },
  VP_LAT: {
    type: Sequelize.DOUBLE,
    defaultValue: 0.0
  },
  VP_LNG: {
    type: Sequelize.DOUBLE,
    defaultValue: 0.0
  }
});

db.sync();
sequelizePaginate.paginate(vipham_Model);
module.exports = vipham_Model;
