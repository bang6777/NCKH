"use strict";
const bcrypt = require("bcryptjs");
var dateFormat = require('dateformat');
// const sequelize = require("../../../Config/db");
const taikhoan_M = require("../../../Model/taikhoan_Model");
const jwt = require('jsonwebtoken');
const secretOrKey = require("../../../controller/passport").getSecretOrKey();
const muontra_M = require("../../../Model/muontra_Model");
const vipham_M = require("../../../Model/vipham_Model");
const huhong_M = require("../../../Model/huhong_Model");
const loi_M = require("../../../Model/loi_Model");
const Sequelize = require("sequelize");

//-------------------------------------------------------
exports.checkLoginServer = (TK_ID, TK_PASSWORD, cb) => {
  taikhoan_M.findOne({
    where: {
      TK_ID: TK_ID.toUpperCase(),
      TK_QUYEN: "Người dùng"
    }
  })
    .then(tk_bang => {
      if (tk_bang) {
        console.log(tk_bang.TK_ID);
        if (bcrypt.compareSync(TK_PASSWORD, tk_bang.TK_PASSWORD)) {
          if (tk_bang.TK_HIEULUC == 1) {
            console.log("Đăng nhập thành công, ", tk_bang.TK_ID);
            let payload = { TK_ID: tk_bang.TK_ID };
            let token = jwt.sign(payload, secretOrKey);
            cb(null, token);
          } else {
            cb("Tài khoản hết hiệu lực. Vui lòng liên hệ với người quản trị để được mở ", null);
          }

        } else {
          // console.log("Sai tài khoản hoặc password, ", tk_bang.TK_ID);
          cb("Bạn đã nhập sai mật khẩu !", null);
        }
      } else {
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
      attributes: ['TK_ID', 'TK_HOTEN', "TK_DONVI", "TK_LOAI"],
      where: {
        TK_ID: TK_ID
      }
    })
    .then(tk_result => {
      // console.log("tài khoản: ", tk_result);
      cb(null, tk_result);
    }).catch(err => {
      cb(err, null);
    });
};

// -------------------Lịch sử---------------------
exports.layLSMuonTra_TK = (TK_ID, page, cb) => {
  muontra_M.paginate({
    // attributes: ['id', 'name'],
    page: page, // Default 1
    paginate: 5, // Default 25
    order: [['MUON_THOIGIAN', 'DESC']],
    where: { TK_ID: TK_ID }
  }).then(MT_result => {
    // console.log("Mượn trả: ", MT_result);
    cb(null, MT_result);
  }).catch(err => {
    cb(err, null);
  });
};

exports.layLSBaoHuHong_TK = (TK_ID, page, cb) => {
  huhong_M.paginate({
    // attributes: ['id', 'name'],
    page: page, // Default 1
    paginate: 5, // Default 25
    order: [['HH_THOIGIAN', 'DESC']],
    where: { TK_ID: TK_ID }
  }).then(MT_result => {
    // console.log("Mượn trả: ", MT_result);
    cb(null, MT_result);
  }).catch(err => {
    cb(err, null);
  });
};
exports.layLSViPham_TK = (TK_ID, page, cb) => {
  vipham_M.paginate({
    attributes: ['VP_ID', 'VP_THOIGIAN', 'DA_XU_LY_VP', 'VP_LAT', 'VP_LNG'],
    // .findAll({
    // include: [],
    include: [
      {
        attributes: ["LOI_TEN", 'LOI_MOTA'],
        model: loi_M,
        // where: { LOI_ID: Sequelize.col('loi.LOI_ID') }
      }, {
        attributes: ['MUONTRA_ID', "TK_ID", 'XE_ID'],
        model: muontra_M,
        where: { TK_ID: TK_ID },
        paginate: 5, // Default 25
      }],
    // })
    page: page, // Default 1

    order: [['VP_THOIGIAN', 'DESC']],
    // where: { TK_ID: TK_ID }
  }).then(MT_result => {
    // console.log("Mượn trả: ", MT_result);
    cb(null, MT_result);
  }).catch(err => {
    cb(err, null);
  });





};


// ------------------------Mượn xe ---------------------
exports.muonXe = (TK_ID, XE_ID, MUON_VITRI_LAT, MUON_VITRI_LNG, cb) => {
  muontra_M.findOne({
    where: { TK_ID: TK_ID, TRA_THOIGIAN: null },
    
    order: [['MUON_THOIGIAN', 'DESC']],
  }).then(result => {
    console.log("result:" +result);
    if (result) { // Đang mượn xe ---> K cho mượn nữa
      cb("Chỉ cho phép mượn 1 chiếc xe", null);
    } else {  // Chưa có mượn xe --->Cho phép mượn
      muontra_M.create({
        TK_ID: TK_ID,
        XE_ID: XE_ID,
        MUON_VITRI_LAT: MUON_VITRI_LAT,
        MUON_VITRI_LNG: MUON_VITRI_LNG
      }).then(data => {

        cb(null, "Đã mượn thành công");
      }).catch(err => {
        cb(err, null);
      });
    }
  }).catch(err => {
    cb(err, null);
  });
}

exports.layThongTinXeMuon = (TK_ID, cb) => {
  muontra_M.findOne({
    where: {
      TK_ID: TK_ID,
      TRA_THOIGIAN: null
    }
  }).then(result => {

    cb(null, result);

  }).catch(err => {
    cb(err, null);
  });

}



