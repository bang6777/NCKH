"use strict";
const vipham_M = require("../Model/vipham_Model");
const muontra_M = require("../Model/muontra_Model");
const taikhoan_M = require("../Model/taikhoan_Model");
const xe_M = require("../Model/xe_Model");
const Sequelize = require("sequelize");

exports.allViPham = cb => {
  vipham_M.findAll({ order: [["createdAt", "DESC"]] }).then(vipham => {
    cb(null, vipham);
    console.log("All vipham:", JSON.stringify(vipham, null, 4));
  });
};

exports.vipham_taikhoan = (TK_ID, cb) => {
  vipham_M
    .findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: muontra_M,
          where: {
            taikhoanTKID: TK_ID
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

//vi pham - xe
exports.vipham_xe = (XE_ID, cb) => {
  vipham_M
    .findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: muontra_M,
          where: {
            xeXEID: XE_ID
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

//vi pham - chi tiet
exports.vipham_chitiet = function(VP_ID, cb) {
  vipham_M
    .findOne({
      include: [
        {
          model: muontra_M
          // where: {
          //   MUONTRA_ID: MUONTRA_ID
          // }
        }
      ],
      where: {
        VP_ID: VP_ID
      }
    })
    .then(dsViPham => {
      if (dsViPham) {
        cb(null, dsViPham);
      } else cb("Không có dữ liệu", null);
      console.log("All vi pham theo id:", JSON.stringify(dsViPham, null, 4));
    });
};

//cap nhat xu ly vi pham
exports.updateXuLy = function(VP_ID, VP_TRANGTHAI, cb) {
  vipham_M
    .update(
      {
        VP_TRANGTHAI: VP_TRANGTHAI
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
      order: [["createdAt", "DESC"]],
      where: {
        VP_TRANGTHAI: 0
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
      order: [["createdAt", "DESC"]],
      where: {
        VP_TRANGTHAI: 1
      }
    })
    .then(vipham => {
      cb(null, vipham);
      console.log("All vipham:", JSON.stringify(vipham, null, 4));
    });
};

//get Thong ke vi pham
exports.ThongKeViPham = (tungay, denngay, cb) => {
  const Op = Sequelize.Op;
  vipham_M
    .findAll({
      order: [["createdAt", "DESC"]],

      where: {
        VP_THOIGIAN: {
          [Op.between]: [tungay, denngay]
        }
      }
    })

    .then(vp => {
      console.log("vipham: ", vp.VP_ID);
      cb(null, vp);
    });
};
