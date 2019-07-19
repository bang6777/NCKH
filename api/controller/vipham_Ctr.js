"use strict";
const vipham_M = require("../Model/vipham_Model");
const muontra_M = require("../Model/muontra_Model");
const loi_M = require("../Model/loi_Model");
const taikhoan_M = require("../Model/taikhoan_Model");
exports.vipham_nguoidung = function(MUONTRA_ID, TK_ID, LOI_ID, cb) {
  vipham_M
    .findAll({
      include: [
        {
          model: muontra_M,
          where: {
            MUONTRA_ID: MUONTRA_ID
          }
        },
        {
          model: taikhoan_M,
          where: {
            TK_ID: TK_ID
          }
        },
        {
          model: loi_M,
          where: {
            LOI_ID: LOI_ID
          }
        }
      ]
    })
    .then(dsViPham => {
      if (dsViPham) {
        cb(null, dsViPham);
      } else cb("Không có dữ liệu", null);
      console.log("All users Vi Pham:", JSON.stringify(dsViPham, null, 4));
    });
};

exports.allViPham = cb => {
  vipham_M.findAll().then(vipham => {
    cb(null, vipham);
    console.log("All vipham:", JSON.stringify(vipham, null, 4));
  });
};
