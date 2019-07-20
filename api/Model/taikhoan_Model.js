const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const db = require("./../Config/db");
const muontra_Model = require("../Model/muontra_Model");
const huhong_Model = require("../Model/huhong_Model");
const vipham_Model = require("../Model/vipham_Model");
const xe_Model = require("../Model/xe_Model");
const loi_Model = require("../Model/loi_Model");

const taikhoan_Model = db.define("taikhoan", {
  // attributes
  TK_ID: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  TK_PASSWORD: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  TK_HOTEN: {
    type: Sequelize.STRING
  },
  TK_QUYEN: {
    type: Sequelize.STRING
  },
  TK_DONVI: {
    type: Sequelize.STRING
  },
  TK_LOAI: {
    type: Sequelize.STRING
  },
  TK_HIEULUC: {
    type: Sequelize.STRING
  }
});

//muon tra
muontra_Model.belongsTo(taikhoan_Model, { foreignKey: "TK_ID" });
muontra_Model.belongsTo(xe_Model, { foreignKey: "XE_ID" });

//hu hong
huhong_Model.belongsTo(taikhoan_Model, { foreignKey: "TK_ID" });
huhong_Model.belongsTo(xe_Model, { foreignKey: "XE_ID" });

//vi pham
vipham_Model.belongsTo(taikhoan_Model, { foreignKey: "TK_ID" });
vipham_Model.belongsTo(loi_Model, { foreignKey: "LOI_ID" });
vipham_Model.belongsTo(xe_Model, { foreignKey: "XE_ID" });
vipham_Model.belongsTo(muontra_Model, { foreignKey: "MUONTRA_ID" });

db.sync();
module.exports = taikhoan_Model;
