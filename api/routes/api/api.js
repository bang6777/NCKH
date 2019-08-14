"use strict";
var express = require("express");
var router = express.Router();

var taikhoan_ctr = require("./controllers/taikhoan-ctr");
var xe = require("./controllers/xe-ctr");
var huhong = require("./controllers/huhong-ctr");
var passport = require("../../controller/passport");

//Dang nhap ok
router.post("/api/taikhoan", function (req, res) {
  var TK_ID = req.body.TK_ID;
  var TK_PASSWORD = req.body.TK_PASSWORD;
  TK_ID = TK_ID.toUpperCase();
  if (TK_ID == null) {
    res.status(400).send("Tên tài khoản không hợp lệ");
  } else if (TK_PASSWORD == null) {
    res.status(400).send("Mật khẩu không hợp lệ");
  } else {
    taikhoan_ctr.checkLoginServer(TK_ID, TK_PASSWORD, function (err, data) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json({ token: data });
      }
    });
  }

});

//Lay thong tin nguoi dung
router.get("/api/taikhoan/:TK_ID", passport.getPassport().authenticate('jwt', { session: false }), function (req, res) {
  var TK_ID = req.params.TK_ID;
  // console.log("Req:"+JSON.stringify())
  TK_ID = TK_ID.toUpperCase();
  if (req.user.TK_ID == TK_ID) {
    taikhoan_ctr.findTKByID(TK_ID, function (err, data) {
      if (err) {
        res.status(400).send(err);
      } else res.status(200).json(data);
    });
  } else {
    res.status(400).send("Yêu cầu không hợp lệ");
  }

});

//Cap nhat thong tin nguoi dung
// router.put("/api/taikhoan/:TK_ID", function(req, res) {
//   res.status(200).json({ message: "cập nhật thông tin người dùng" });
// });

//Dang xuat
// router.post("/api/taikhoan/:TK_ID/signout", function(req, res) {
//   res.status(200).json({ message: "đăng xuất" });
// });

//Xem danh sách mượn trả xe
router.get("/api/taikhoan/:TK_ID/lich-su-muon-xe", passport.getPassport().authenticate('jwt', { session: false }), function (req, res) {
  var TK_ID = req.params.TK_ID;
  var page = req.query.page;
  TK_ID = TK_ID.toUpperCase();
  console.log("PAGE=" + page);
  if (req.user.TK_ID == TK_ID) {
    taikhoan_ctr.layLSMuonTra_TK(TK_ID, page, function (err, MT_result) {
      if (err) res.status(400).send(err);
      else {
        res.status(200).json(MT_result);
      }
    });
  } else {
    res.status(400).send("Yêu cầu không hợp lệ");
  }
});

//Xem danh sách lịch sử báo hư hỏng
router.get("/api/taikhoan/:TK_ID/lich-su-bao-hu-hong", passport.getPassport().authenticate('jwt', { session: false }), function (req, res) {
  var TK_ID = req.params.TK_ID;
  var page = req.query.page;

  TK_ID = TK_ID.toUpperCase(); 

  console.log("PAGE=" + page);
  if (req.user.TK_ID == TK_ID) {
    taikhoan_ctr.layLSBaoHuHong_TK(TK_ID, page, function (err, MT_result) {
      if (err) res.status(400).send(err);
      else {
        res.status(200).json(MT_result);
      }
    });
  } else {
    res.status(400).send("Yêu cầu không hợp lệ");
  }
});

//Xem danh sách lịch sử vi phạm
router.get("/api/taikhoan/:TK_ID/lich-su-vi-pham", passport.getPassport().authenticate('jwt', { session: false }), function (req, res) {
  var TK_ID = req.params.TK_ID;
  var page = req.query.page;

  TK_ID = TK_ID.toUpperCase();

  console.log("PAGE=" + page);
  if (req.user.TK_ID == TK_ID) {
    taikhoan_ctr.layLSViPham_TK(TK_ID, page, function (err, MT_result) {
      if (err) res.status(400).send(err);
      else {
        res.status(200).json(MT_result);
      }
    });
  } else {
    res.status(400).send("Yêu cầu không hợp lệ");
  }
});

//mượn xe
router.post("/api/taikhoan/:TK_ID/muonxe", passport.getPassport().authenticate('jwt', { session: false }), function (req, res) {
  var TK_ID = req.params.TK_ID;
  var XE_ID = req.body.XE_ID;
  var MUON_VITRI_LAT = req.body.MUON_VITRI_LAT;
  var MUON_VITRI_LNG = req.body.MUON_VITRI_LNG;

  TK_ID = TK_ID.toUpperCase();

  if (req.user.TK_ID == TK_ID && XE_ID && MUON_VITRI_LNG && MUON_VITRI_LAT) {

    taikhoan_ctr.muonXe(TK_ID, XE_ID, MUON_VITRI_LAT, MUON_VITRI_LNG, function (err, MT_result) {
      if (err) res.status(400).send(err);
      else {
        xe.updateTrangThaiXe(XE_ID, 1, function (err, result) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).json({ message: MT_result });
          }
        });

      }
    });
  } else {
    res.status(400).send("Yêu cầu không hợp lệ");
  }
});

//thông tin xe đang mượn
router.get("/api/taikhoan/:TK_ID/muonxe", passport.getPassport().authenticate('jwt', { session: false }), function (req, res) {
  var TK_ID = req.params.TK_ID;
  TK_ID = TK_ID.toUpperCase();
  if (req.user.TK_ID == TK_ID) {
    taikhoan_ctr.layThongTinXeMuon(TK_ID, function (err, MT_result) {
      if (err) res.status(400).send(err);
      else {
        res.status(200).json(MT_result);
      }
    });
  } else {
    res.status(400).send("Yêu cầu không hợp lệ");
  }
});

// //trả xe
// router.delete("/api/taikhoan/:TK_ID/muonxe", function(req, res) {
//   res.status(200).json({ message: "trả xe" });
// });

//ds xe đang rảnh ok
router.get("/api/xe", function (req, res) {
  xe.getXeRanh(function (err, data) {
    if (err) res.status(200).send(err);
    else
      res.status(200).json(data);
  });
});

// //Lấy thông tin chi tiết xe ok
// router.get("/api/xe/:XE_ID", function(req, res) {
//   var XE_ID = req.params.XE_ID;
//   xe.findXeByID(XE_ID, function(err, data) {
//     res.status(200).json(data);
//   });
// });

router.get("/api/xe/:XE_ID", function (req, res) {
  var XE_ID = req.params.XE_ID;
  xe.findXeByID(XE_ID, function (err, data) {
    if (err) res.status(400).send(err);
    else
      res.status(200).json(data);
  });
});

//Báo hư hỏng
router.post("/api/xe/:XE_ID", passport.getPassport().authenticate('jwt', { session: false }), function (req, res) {

  var XE_ID = req.params.XE_ID;
  var TK_ID = req.body.TK_ID;
  var HH_MOTA = req.body.HH_MOTA;
  TK_ID = TK_ID.toUpperCase();
  if (req.user.TK_ID == TK_ID && XE_ID && HH_MOTA) {
    xe.baoHuHong(XE_ID, TK_ID, HH_MOTA, function (err, MT_result) {
      if (err) res.status(400).send(err);
      else {
        res.status(200).json({ message: MT_result });
      }
    });
  } else {
    res.status(400).send("Yêu cầu không hợp lệ");
  }
});

// //Lấy danh sách các loại hư hỏng ok
// router.get("/api/huhong", function(req, res) {
//   huhong.allHuHong(function(err, data) {
//     res.status(200).json(data);
//   });
// });

module.exports = router;
