const Sequelize = require("sequelize");
const db = require("./../Config/db");

const loi_Model = db.define("loi", {
  LOI_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  LOI_TEN: {
    type: Sequelize.STRING
  },
  LOI_MOTA: {
    type: Sequelize.STRING
  }
});

db.sync();
module.exports = loi_Model;
