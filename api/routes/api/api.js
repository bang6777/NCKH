"use strict";
var express = require("express");
var router = express.Router();
var taikhoan = require("./controllers/taikhoan-ctr");
var xe = require("./controllers/xe-ctr");
var huhong = require("./controllers/huhong-ctr");
var passport = require("../../controller/passport");

//Dang nhap ok
router.post("/api/taikhoan", function(req, res) {
  var TK_ID = req.body.TK_ID;
  var TK_PASSWORD = req.body.TK_PASSWORD;
  if (TK_ID == null) {
    res.status(404).json({ message: "TK_ID null" });
  }else  if (TK_PASSWORD == null) {
    res.status(404).json({ message: "TK_Pwd null" });
  }else{
    taikhoan.checkLoginServer(TK_ID, TK_PASSWORD, function(err, data) {
      if (err) {
        res.status(200).json({ message: err });
      } else {
        res.status(200).json({token: data});
      }
    });
  }
  
});

//Lay thong tin nguoi dung
router.get("/api/taikhoan/:TK_ID", passport.getPassport().authenticate('jwt', { session: false }),function(req, res) {
  var TK_ID = req.params.TK_ID;
  taikhoan.findTKByID(TK_ID, function(err, data) {
    res.status(200).json(data);
  });
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
router.get("/api/taikhoan/:TK_ID/xe", function(req, res) {
  res.status(200).json({ message: "xem ds mượn trả" });
});

//mượn xe
router.post("/api/taikhoan/:TK_ID/muonxe", function(req, res) {
  res.status(200).json({ message: "mượn xe" });
});

//thông tin xe đang mượn
router.get("/api/taikhoan/:TK_ID/muonxe", function(req, res) {
  res.status(200).json({ message: "thông tin xe đang mượn" });
});

// //trả xe
// router.delete("/api/taikhoan/:TK_ID/muonxe", function(req, res) {
//   res.status(200).json({ message: "trả xe" });
// });

//ds xe đang rảnh ok
router.get("/api/xe", function(req, res) {
  xe.getXeRanh(function(err, data) {
    res.status(200).json(data);
  });
});

//Lấy thông tin chi tiết xe ok
router.get("/api/xe/:XE_ID", function(req, res) {
  var XE_ID = req.params.XE_ID;
  xe.findXeByID(XE_ID, function(err, data) {
    res.status(200).json(data);
  });
});

//Báo hư hỏng
router.get("/api/xe/:XE_ID", function(req, res) {
  res.status(200).json({ message: "Báo hư hỏng" });
});

//Lấy danh sách các loại hư hỏng ok
router.get("/api/huhong", function(req, res) {
  huhong.allHuHong(function(err, data) {
    res.status(200).json(data);
  });
});

module.exports = router;
