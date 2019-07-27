"use strict";
const huhong_M = require("../Model/huhong_Model");
const taikhoan_M = require("../Model/taikhoan_Model");
const xe_M = require("../Model/xe_Model");

exports.allHuHong = cb => {
  huhong_M.findAll().then(huhong => {
    cb(null, huhong);
    console.log("Tất cả hư hỏng: ", JSON.stringify(huhong, null, 4));
  });
};

//Hu hong theo TK
exports.huhong_taikhoan = function(TK_ID, cb) {
  huhong_M
    .findAll({
      include: [
        {
          model: taikhoan_M,
          where: {
            TK_ID: TK_ID
          }
        }
      ]
    })
    .then(dsHuHong => {
      if (dsHuHong) {
        cb(null, dsHuHong);
      } else cb("Không có dữ liệu", null);
      console.log("All hu hong theo tài khoản:", JSON.stringify(dsHuHong, null, 4));
    });
};

//hu hong theo xe
exports.huhong_xe = function(XE_ID, cb) {
  huhong_M
    .findAll({
      include: [
        {
          model: xe_M,
          where: {
            XE_ID: XE_ID
          }
        }
      ]
    })
    .then(dsHuHong => {
      if (dsHuHong) {
        cb(null, dsHuHong);
      } else cb("Không có dữ liệu", null);
      console.log("All hu hong theo xe id:", JSON.stringify(dsHuHong, null, 4));
    });
};

exports.findHuHongByID = (HH_ID, cb) => {
  huhong_M
    .findOne({
      where: {
        HH_ID: HH_ID
      }
    })
    .then(hh => {
      console.log("Hư hỏng: ", hh.HH_ID);
      cb(null, hh);
    });
};

exports.getHuHongDangCho = cb => {
  huhong_M
    .findAll({
      where: {
        HH_TRANGTHAI: "0"
      }
    })
    .then(hh => {
      console.log("Hư hỏng đang chờ: ", hh.HH_ID);
      cb(null, hh);
    });
};

exports.getHuHongDangSua = cb => {
  huhong_M
    .findAll({
      where: {
        HH_TRANGTHAI: "1"
      }
    })
    .then(hh => {
      console.log("Hư hỏng đang sua: ", hh.HH_ID);
      cb(null, hh);
    });
};

exports.getHuHongDaSua = cb => {
  huhong_M
    .findAll({
      where: {
        HH_TRANGTHAI: "2"
      }
    })
    .then(hh => {
      console.log("Hư hỏng đã sửa: ", hh.HH_ID);
      cb(null, hh);
    });
};

exports.getHuHongBaoSai = cb => {
  huhong_M
    .findAll({
      where: {
        HH_TRANGTHAI: "3"
      }
    })
    .then(hh => {
      console.log("Hư hỏng báo sai: ", hh.HH_ID);
      cb(null, hh);
    });
};

exports.updateTrangThaiHuHong = (HH_ID, HH_TRANGTHAI, cb) => {
  huhong_M
    .update(
      {
        HH_TRANGTHAI: HH_TRANGTHAI
      },
      {
        where: {
          HH_ID: HH_ID
        }
      }
    )
    .then(hh => {
      console.log("Đã cập nhật trạng thái hư hỏng: " + HH_ID);
      cb(null, hh);
    });
};
