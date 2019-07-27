"use strict";
const vipham_M = require("../Model/vipham_Model");
const muontra_M = require("../Model/muontra_Model");
const taikhoan_M = require("../Model/taikhoan_Model");
const xe_M = require("../Model/xe_Model");
const sequelize = require("./../Config/db");

exports.allViPham = cb => {
  vipham_M.findAll().then(vipham => {
    cb(null, vipham);
    console.log("All vipham:", JSON.stringify(vipham, null, 4));
  });
};

//vi pham - tai khoan
exports.vipham_taikhoan = (TK_ID, cb) => {
  sequelize
    .query("SELECT * FROM vipham WHERE muontraMUONTRAID IN ( SELECT muontraMUONTRAID from muontra where taikhoanTKID = :tk_id)", {
      replacements: { tk_id: TK_ID },
      type: sequelize.QueryTypes.SELECT
    })
    .then(tk => {
      console.log(tk);
      cb(null, tk);
    });
};

//vi pham - xe
exports.vipham_xe = function(XE_ID, cb) {
  sequelize
    .query("SELECT * FROM vipham WHERE muontraMUONTRAID IN ( SELECT muontraMUONTRAID from muontra where xeXEID = :xe_id)", {
      replacements: { xe_id: XE_ID },
      type: sequelize.QueryTypes.SELECT
    })
    .then(tk => {
      console.log(tk);
      cb(null, tk);
    });
};

//vi pham - chi tiet
exports.vipham_chitiet = function(MUONTRA_ID, cb) {
  vipham_M
    .findOne({
      include: [
        {
          model: muontra_M,
          where: {
            MUONTRA_ID: MUONTRA_ID
          }
        }
      ]
    })
    .then(dsViPham => {
      if (dsViPham) {
        cb(null, dsViPham);
      } else cb("Không có dữ liệu", null);
      console.log("All vi pham theo id:", JSON.stringify(dsViPham, null, 4));
    });
};

//cap nhat xu ly vi pham
exports.updateXuLy = function(VP_ID, DA_XU_LY_VP, cb) {
  vipham_M
    .update(
      {
        DA_XU_LY_VP: DA_XU_LY_VP
      },
      {
        where: {
          VP_ID: VP_ID
        }
      }
    )
    .then(tk_bang => {
      console.log("Đã cập nhật xử lý vi phạm: ", tk_bang.VP_ID);
      cb(null, tk_bang);
    });
};

//get chua xu ly
exports.VP_ChuaXuLy = cb => {
  vipham_M
    .findAll({
      where: {
        DA_XU_LY_VP: 0
      }
    })
    .then(vipham => {
      cb(null, vipham);
      console.log("All vipham:", JSON.stringify(vipham, null, 4));
    });
};

//get da xu ly
exports.VP_DaXuLy = cb => {
  vipham_M
    .findAll({
      where: {
        DA_XU_LY_VP: 1
      }
    })
    .then(vipham => {
      cb(null, vipham);
      console.log("All vipham:", JSON.stringify(vipham, null, 4));
    });
};
