"use strict";
const loi_M = require("./../Model/loi_Model");

exports.allLoi = cb => {
  loi_M.findAll().then(loi => {
    cb(null, loi);
    console.log("All lỗi:", JSON.stringify(loi, null, 4));
  });
};

exports.addLoi = (LOI_ID, LOI_TEN, LOI_MOTA, cb) => {
  loi_M
    .create({
      LOI_ID: LOI_ID,
      LOI_TEN: LOI_TEN,
      LOI_MOTA: LOI_MOTA
    })
    .then(loi_bang => {
      console.log("Da them loi ID: ", loi_bang.LOI_ID);
      cb(null, loi_bang);
    });
};

exports.deleteLoi = (LOI_ID, cb) => {
  loi_M
    .destroy({
      where: {
        LOI_ID: LOI_ID
      }
    })
    .then(loi_bang => {
      console.log("Đã xóa lỗi: ", loi_bang.LOI_ID);
      cb(null, loi_bang);
    })
    .catch(err => {
      cb(err, null);
    });
};

exports.updateLoi = (LOI_ID, LOI_TEN, LOI_MOTA, cb) => {
  loi_M
    .update(
      {
        LOI_ID: LOI_ID,
        LOI_TEN: LOI_TEN,
        LOI_MOTA: LOI_MOTA
      },
      {
        where: {
          LOI_ID: LOI_ID
        }
      }
    )
    .then(loi_bang => {
      console.log("Cập nhật thành công: ", loi_bang.LOI_ID);
      cb(null, loi_bang);
    });
};

exports.findLoiByID = (LOI_ID, cb) => {
  loi_M
    .findOne({
      where: {
        LOI_ID: LOI_ID
      }
    })
    .then(loi => {
      console.log("Lỗi: ", loi.LOI_ID);
      cb(null, loi);
    });
};
