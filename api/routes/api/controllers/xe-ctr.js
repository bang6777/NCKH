"use strict";
const sequelize = require("../../../Config/db");
const xe_M = require("../../../Model/xe_Model");
const huhong_M = require("../../../Model/huhong_Model");


//ds xe ranh
exports.getXeRanh = cb => {
  xe_M
    .findAll({
      attributes: ['XE_ID', 'XE_LAT', 'XE_LNG'],
      where: {
        XE_TRANGTHAI: 1
      }
    })
    .then(xe => {
      // console.log("XE: ", xe.XE_ID);
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

exports.baoHuHong = (XE_ID, TK_ID, HH_MOTA, cb) => {
  huhong_M.create({
    TK_ID: TK_ID,
    XE_ID: XE_ID,
    HH_MOTA: HH_MOTA
  }).then(result => {
    // console.log("xe: ", xe.XE_ID);
    cb(null, "Đã báo thành công");
  }).catch(err => {
    cb(err, null);
  });
};
