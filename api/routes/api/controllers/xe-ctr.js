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
        XE_TRANGTHAI: 0
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
      attributes: ["XE_ID", "XE_LAT", "XE_LNG", "XE_NAMSANXUAT", "XE_GHICHU"],
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
  //lấy vị trí hu hỏng
  xe_M
    .findOne({
      attributes: ["XE_ID", "XE_LAT", "XE_LNG"],
      where: {
        XE_ID: XE_ID
      }
    })
    .then(xe => {
      if (xe) {
        huhong_M.create({
          taikhoanTKID: TK_ID,
          xeXEID: XE_ID,
          HH_MOTA: HH_MOTA,
          HU_HONG_LAT: xe.XE_LAT,
          HU_HONG_LNG: xe.XE_LNG
        }).then(result => {
          // console.log("xe: ", xe.XE_ID);
          cb(null, "Đã báo thành công");
        }).catch(err => {
          cb(err, null);
        });
      } else {
        cb("Không tìm thấy ID xe", null);
      }

    }).catch(err => {
      cb(err, null);
    });
};

exports.updateTrangThaiXe = (XE_ID, XE_TRANGTHAI, cb) => {
  xe_M
    .update(
      {
        XE_TRANGTHAI: XE_TRANGTHAI
      },
      {
        where: {
          XE_ID: XE_ID
        }
      }
    )
    .then(xe => {
      console.log("Đã cập nhật xe: ", xe.XE_ID);
      cb(null, xe);
    }).catch(err=>{
      cb(err, null);
    });
};