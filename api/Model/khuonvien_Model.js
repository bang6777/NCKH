const Sequelize = require("sequelize");
const db = require("./../Config/db");

const khuonvien_Model = db.define("khuonvien", {
  KV_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  KV_LAT: {
    type: Sequelize.DOUBLE
  },
  KV_LNG: {
    type: Sequelize.DOUBLE
  },
  KV_TRANGTHAI: {
    type: Sequelize.STRING
  }
});

db.sync();
module.exports = khuonvien_Model;
