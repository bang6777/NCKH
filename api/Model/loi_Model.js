// const Sequelize = require("sequelize");
// const db = require("./../Config/db");

// const loi_Model = db.define("loi", {
//   LOI_ID: {
//     type: Sequelize.STRING,
//     primaryKey: true,
//     allowNull: false
//   },
//   LOI_TEN: {
//     type: Sequelize.STRING
//   },
//   LOI_MOTA: {
//     type: Sequelize.STRING
//   }
// });

// db.sync();
// module.exports = loi_Model;

const Sequelize = require("sequelize");
const db = require("./../Config/db");

const khuonvien_Model = db.define("khuonvien", {
  KV_ID: {
    type: Sequelize.STRING,
    primaryKey: true,
    // autoIncrement: true,
    allowNull: false
  },
  KV_TOADO: {
    type: Sequelize.STRING
  },
  KV_TRANGTHAI: {
    type: Sequelize.STRING
  }
});

db.sync();
module.exports = khuonvien_Model;
