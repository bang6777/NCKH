"use strict";
const bcrypt = require("bcryptjs");
const sequelize = require("../../../Config/db");
const taikhoan_M = require("../../../Model/taikhoan_Model");
//-------------------------------------------------------
exports.checkLoginServer = (TK_ID, TK_PASSWORD, cb) => {
  taikhoan_M
    .findOne({
      where: {
        TK_ID: TK_ID,
        TK_QUYEN: "Quản trị"
      }
    })
    .then(tk_bang => {
      console.log(tk_bang.TK_ID);
      if (bcrypt.compareSync(TK_PASSWORD, tk_bang.TK_PASSWORD)) {
        console.log("Đăng nhập thành công, ", tk_bang.TK_ID);
        cb(null, "ok");
      } else {
        console.log("Sai tài khoản hoặc password, ", tk_bang.TK_ID);
        cb(err, null);
      }
      // });
    })
    .catch(err => {
      cb(err, null);
    });
};

exports.findTKByID = (TK_ID, cb) => {
  taikhoan_M
    .findOne({
      where: {
        TK_ID: TK_ID
      }
    })
    .then(tk_bang => {
      console.log("tài khoản: ", tk_bang.TK_ID);
      cb(null, tk_bang);
    });
};
