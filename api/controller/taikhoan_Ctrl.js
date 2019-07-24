"use strict";
const bcrypt = require("bcryptjs");
const sequelize = require("./../Config/db");
const taikhoan_M = require("../Model/taikhoan_Model");
const jwt = require('jsonwebtoken');

exports.allUser = cb => {
  var statement = "select * from taikhoan";
  taikhoan_M.findAll().then(taikhoan => {
    cb(null, taikhoan);
    console.log("All users:", JSON.stringify(taikhoan, null, 4));
  });
};

exports.addUser = (TK_ID, TK_PASSWORD, TK_HOTEN, TK_QUYEN, TK_DONVI, TK_LOAI, TK_HIEULUC, cb) => {
  const salt = bcrypt.genSaltSync();
  TK_PASSWORD = bcrypt.hashSync(TK_PASSWORD, salt);
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
    })
    .catch(err => {
      cb(err, null);
    });
};

exports.updateUser = (TK_ID, TK_HOTEN, TK_DONVI, TK_LOAI, TK_QUYEN, cb) => {
  taikhoan_M
    .update(
      {
        // TK_ID: TK_ID,
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

exports.getOneTK = (TK_ID, TK_HOTEN, TK_DONVI, TK_LOAI, TK_QUYEN, cb) => {
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

exports.findTKByPK = (TK_ID, cb) => {
  taikhoan_M
    .findAll({
      where: {
        TK_ID: TK_ID
      }
    })
    .then(tk_bang => {
      console.log("tài khoản: ", tk_bang.TK_ID);
      cb(null, tk_bang);
    });
};

// exports.checkLoginServer = (TK_ID, TK_PASSWORD, cb) => {
//   taikhoan_M
//     .findOne({
//       where: {
//         TK_ID: TK_ID,
//         TK_QUYEN: "Quản trị"
//       }
//     })
//     .then(tk_bang => {
//       // JSON.stringify(tk_bang);
//       // console.log(JSON.stringify(tk_bang));
//       // console.log(TK_PASSWORD + tk_bang.TK_PASSWORD);
//       if (bcrypt.compareSync(TK_PASSWORD, tk_bang.TK_PASSWORD)) {
//         console.log("Đăng nhập thành công, ", tk_bang.TK_ID);
//       } else {
//         console.log("Sai tài khoản hoặc password, ", tk_bang.TK_ID);
//         cb(err, null);
//       }
//     });
// };

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

exports.updateHieuLuc = (TK_ID, TK_HIEULUC, cb) => {
  taikhoan_M
    .update(
      {
        TK_HIEULUC: TK_HIEULUC
      },
      {
        where: {
          TK_ID: TK_ID
        }
      }
    )
    .then(tk_bang => {
      console.log("Đã cập nhật hiệu lực tài khoản: ", tk_bang.TK_ID);
      cb(null, tk_bang);
    });
};

exports.getTKConHieuLuc = cb => {
  taikhoan_M
    .findAll({
      where: {
        TK_HIEULUC: "1"
      }
    })
    .then(tk_bang => {
      console.log("tài khoản: ", tk_bang.TK_ID);
      cb(null, tk_bang);
    });
};

exports.getTKVoHieuLuc = cb => {
  taikhoan_M
    .findAll({
      where: {
        TK_HIEULUC: "0"
      }
    })
    .then(tk_bang => {
      console.log("tài khoản: ", tk_bang.TK_ID);
      cb(null, tk_bang);
    });
};

//search
exports.searchTK_ID = (id, hieuluc1, hieuluc2, cb) => {
  sequelize
    .query("SELECT * FROM taikhoan WHERE TK_ID LIKE :search_id AND (TK_HIEULUC= :search_hieuluc1 OR TK_HIEULUC= :search_hieuluc2)", {
      replacements: { search_id: "%" + id + "%", search_hieuluc1: hieuluc1, search_hieuluc2: hieuluc2 },
      type: sequelize.QueryTypes.SELECT
    })
    .then(tk => {
      console.log(tk);
      cb(null, tk);
    });
};
