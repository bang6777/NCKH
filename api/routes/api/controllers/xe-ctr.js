"use strict";
const sequelize = require("../../../Config/db");
const xe_M = require("../../../Model/xe_Model");

//ds xe ranh
exports.getXeRanh = cb => {
  xe_M
    .findAll({
      where: {
        XE_TRANGTHAI: "0"
      }
    })
    .then(xe => {
      console.log("XE: ", xe.XE_ID);
      cb(null, xe);
    });
};

//tim xe theo id
exports.findXeByID = (XE_ID, cb) => {
  xe_M
    .findOne({
      where: {
        XE_ID: XE_ID
      }
    })
    .then(xe => {
      console.log("xe: ", xe.XE_ID);
      cb(null, xe);
    });
};
