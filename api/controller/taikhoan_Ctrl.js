"use strict";
const sequelize = require("./../Config/db");
const taikhoan_M = require("../Model/taikhoan_Model");

// exports.allUser = (query,cb) =>{
//     var statement = "select * from taikhoan";
//     sequelize.query(statement).then((data) => {
//         cb.end(JSON.stringify(data));
//         });
//     };

exports.allUser = cb => {
  //var statement = "select * from taikhoan";
  taikhoan_M.findAll().then(taikhoan => {
    cb(null, taikhoan);
    console.log("All users:", JSON.stringify(taikhoan, null, 4));
  });
};

exports.addUser = (
  TK_ID,
  TK_PASSWORD,
  TK_HOTEN,
  TK_QUYEN,
  TK_DONVI,
  TK_LOAI,
  TK_HIEULUC,
  cb
) => {
  taikhoan_M
    .create({
      TK_ID: TK_ID,
      TK_PASSWORD: TK_PASSWORD,
      TK_HOTEN: TK_HOTEN,
      TK_QUYEN: TK_QUYEN,
      TK_DONVI: TK_DONVI,
      TK_LOAI: TK_LOAI,
      TK_HIEULUC: TK_HIEULUC
    })
    .then(tk_bang => {
      console.log("Bang's auto-generated ID:", tk_bang.TK_ID);
      cb(null, tk_bang);
    });
};

exports.deleteUser = (TK_ID, cb) => {
  taikhoan_M
    .destroy({
      where: {
        TK_ID: TK_ID
      }
    })
    .then(tk_bang => {
      console.log("Đã xóa tài khoản: ", tk_bang.TK_ID);
      cb(null, tk_bang);
    });
};

exports.updateUser = (TK_ID, TK_HOTEN, TK_DONVI, TK_LOAI, TK_QUYEN, cb) => {
  taikhoan_M
    .update(
      {
        TK_ID: TK_ID,
        TK_HOTEN: TK_HOTEN,
        TK_DONVI: TK_DONVI,
        TK_LOAI: TK_LOAI,
        TK_QUYEN: TK_QUYEN
      },
      {
        where: {
          TK_ID: TK_ID
        }
      }
    )
    .then(tk_bang => {
      console.log("Đã cập nhật tài khoản: ", tk_bang.TK_ID);
      cb(null, tk_bang);
    });
};
