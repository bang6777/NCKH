"use strict";
const xe_M = require("../Model/xe_Model");

exports.allXe = cb => {
  // var statement = "select * from taikhoan";
  xe_M.findAll().then(xe => {
    cb(null, xe);
    console.log("All xe:", JSON.stringify(xe, null, 4));
  });
};

exports.addXe = (XE_ID, XE_NAMSANXUAT, XE_GHICHU, cb) => {
  xe_M
    .create({
      XE_ID: XE_ID,
      XE_NAMSANXUAT: XE_NAMSANXUAT,
      XE_GHICHU: XE_GHICHU
    })
    .then(xe => {
      console.log("Xe ID: " + xe.XE_ID);
      cb(null, xe);
    });
};

exports.deleteXe = (XE_ID, cb) => {
  xe_M
    .destroy({
      where: {
        XE_ID: XE_ID
      }
    })
    .then(xe => {
      console.log("Đã xóa xe: ", xe.XE_ID);
      cb(null, xe);
    });
};
