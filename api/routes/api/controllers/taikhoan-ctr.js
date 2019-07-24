"use strict";
const bcrypt = require("bcryptjs");
// const sequelize = require("../../../Config/db");
const taikhoan_M = require("../../../Model/taikhoan_Model");
const jwt = require('jsonwebtoken');
const secretOrKey = require("../../../controller/passport").getSecretOrKey();
//-------------------------------------------------------
exports.checkLoginServer = (TK_ID, TK_PASSWORD, cb) => {
  taikhoan_M.findOne({
              where: {
                TK_ID: TK_ID.toUpperCase(),
                TK_QUYEN: "Người dùng"
              }
            })
            .then(tk_bang => {
              if(tk_bang){
                console.log(tk_bang.TK_ID);
                if (bcrypt.compareSync(TK_PASSWORD, tk_bang.TK_PASSWORD)) {
                  if(tk_bang.TK_HIEULUC == 1){
                    console.log("Đăng nhập thành công, ", tk_bang.TK_ID);
                    let payload = { TK_ID: tk_bang.TK_ID };
                    let token = jwt.sign(payload, secretOrKey);
                    cb(null, token);
                  }else{
                    cb("Tài khoản hết hiệu lực. Vui lòng liên hệ với người quản trị để được mở ", null);
                  }
                  
                } else {
                  // console.log("Sai tài khoản hoặc password, ", tk_bang.TK_ID);
                  cb("Bạn đã nhập sai mật khẩu !", null);
                }
              }else{
                cb("Tên đăng nhập không tồn tại !", null);
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
    .then(tk_result => {
      tk_result.toObject();
      delete tk_result.TK_PASSWORD;
      delete tk_result.TK_HIEULUC;
      delete tk_result.TK_QUYEN;
      delete tk_result.createdAt;
      delete tk_result.updatedAt;
      // console.log("tài khoản: ", tk_result);
      cb(null, tk_result);
    }).catch(err => {
      cb(err, null);
    });
};
