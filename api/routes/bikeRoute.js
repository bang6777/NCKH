"use strict";
var express = require("express");
var router = express.Router();
var taikhoan = require("../controller/taikhoan_Ctrl");
var xe = require("../controller/xe_Ctr");
var loi = require("../controller/loi_Ctr");
var huhong = require("../controller/huhong_Ctr");
var muontra = require("../controller/muontra_Ctr");
var vipham = require("../controller/vipham_Ctr");
var khuonvien = require("../controller/khuonvien_Ctr");

var viphamRoute = require("./vipham_Route");
var muontraRoute = require("./muontra_Route");
var huhongRoute = require("./huhong_Route");

const jwt = require("jsonwebtoken");
//Login
router.get("/login", function (req, res) {
  res.render("./../api/views/login");
});

router.post("/login", function (req, res) {
  var TK_ID = req.body.TK_ID;
  var TK_PASSWORD = req.body.TK_PASSWORD;
  // var TK_QUYEN = req.body.TK_QUYEN;
  if (TK_ID == null) {
    res.status(404).json({ message: "TK_ID null" });
  }
  if (TK_PASSWORD == null) {
    res.status(404).json({ message: "TK_Pwd null" });
  }

  taikhoan.checkLoginServer(TK_ID, TK_PASSWORD, function (err, data) {
    if (err) {
      // res.status(404).json({ message: "ERR!" });
      res.status(200).json("err");
    } else {
      // res.status(200).json({ message: "đã đăng nhập thành công!" });

      // res.session.TK_ID = req.body.TK_ID;
      // console.log(req.session.TK_ID);
      res.status(200).json("ok");
      // res.end("done");
    }
  });
  // jwt.sign({taikhoan:taikhoan}, 'secretkey', (err,token)=>{
  //   res.json({
  //     token:token
  //   })
  // })
});

router.post("/api/login", (req, res) => {
  jwt.sign({ taikhoan: taikhoan.TK_ID }, "secretkey", (err, token) => {
    res.json({
      token: token
    });
  });
});

// Trang chủ
router.get("/", function (req, res) {
  // var sess = req.session;
  // if (req.session.TK_ID) {
  res.render("./../api/views/index");
  // } else {
  // res.redirect("/login");
  // }
});

//----Danh mục
//------------- Tài Khoản
router.get("/taikhoan", function (req, res) {
  taikhoan.allUser(function (err, data) {
    res.render("./../api/views/taikhoan", { taikhoan: data });
  });
});

//-----------add tài khoản
router.post("/taikhoan", function (req, res, next) {
  var TK_ID = req.body.TK_ID;
  var TK_PASSWORD = req.body.TK_PASSWORD;
  var TK_HOTEN = req.body.TK_HOTEN;
  var TK_QUYEN = req.body.TK_QUYEN;
  var TK_DONVI = req.body.TK_DONVI;
  var TK_LOAI = req.body.TK_LOAI;
  // var TK_HIEULUC = req.body.TK_HIEULUC;

  if (TK_ID == null) {
    res.status(404).json({ message: "TK_ID null" });
  }
  if (TK_PASSWORD == null) {
    res.status(404).json({ message: "TK_Pwd null" });
  }
  if (TK_HOTEN == null) {
    res.status(404).json({ message: "TK_HOTEN null" });
  }
  if (TK_QUYEN == null) {
    res.status(404).json({ message: "TK_QUYEN null" });
  }
  if (TK_DONVI == null) {
    res.status(404).json({ message: "TK_DONVI null" });
  }
  if (TK_LOAI == null) {
    res.status(404).json({ message: "TK_LOAI null" });
  }
  taikhoan.addUser(TK_ID, TK_PASSWORD, TK_HOTEN, TK_QUYEN, TK_DONVI, TK_LOAI, 1, function (err, data) {
    if (err) {
      res.status(404).json({ message: "ERR!" });
    } else {
      res.status(200).json({ message: "đã thêm thành công!" });
      // res.redirect("/taikhoan");
    }
  });
});

// ---------------------------------------------Test
//get all TK
router.get("/taikhoan/all", function (req, res) {
  taikhoan.allUser(function (err, data) {
    res.status(200).json(data);
  });
});

//get 1 TK theo id
router.post("/taikhoan/find", function (req, res) {
  var TK_ID = req.body.TK_ID;
  taikhoan.findTKByPK(TK_ID, function (err, data) {
    res.status(200).json(data);
  });
});

//cap nhat hieu luc
router.post("/taikhoan/update-hieuluc/:TK_ID", function (req, res) {
  var TK_ID = req.body.TK_ID;
  var TK_HIEULUC = req.body.TK_HIEULUC;
  taikhoan.updateHieuLuc(TK_ID, TK_HIEULUC, function (err, data) {
    if (err) {
      // res.status(404).json({ message: "ERR" });
      res.status(404).json(err.name);
      // return res.redirect("/taikhoan");
    } else {
      res.status(200).json({ message: "đã cập nhật hiệu lực tài khoản ID: " + TK_ID });
    }
  });
});

//cap nhat thong tin
router.post("/taikhoan/update/:TK_ID", function (req, res) {
  var TK_ID = req.body.TK_ID;
  var TK_HOTEN = req.body.TK_HOTEN;
  var TK_DONVI = req.body.TK_DONVI;
  var TK_LOAI = req.body.TK_LOAI;
  var TK_QUYEN = req.body.TK_QUYEN;
  taikhoan.updateUser(TK_ID, TK_HOTEN, TK_DONVI, TK_LOAI, TK_QUYEN, function (err, data) {
    if (err) {
      res.status(404).json({ message: "ERR" });
    } else {
      res.status(200).json({ message: "đã cập nhật thông tin tài khoản ID: " + TK_ID });
    }
  });
});

//xoa taikhoan
router.post("/taikhoan/delete/:TK_ID", function (req, res) {
  var TK_ID = req.body.TK_ID;
  taikhoan.deleteUser(TK_ID, function (err, data) {
    if (err.name == "SequelizeForeignKeyConstraintError") {
      // res.status(202).json(err.name);
      res.status(202).json("fk");
    } else {
      // res.status(200).json({ message: "đã xóa thành công tài khoản ID: " + TK_ID });
      res.status(200).json("ok");
    }
  });
});

//tai khoan con hieu luc
router.get("/taikhoan/conhieuluc", function (req, res) {
  taikhoan.getTKConHieuLuc(function (err, data) {
    res.status(200).json(data);
  });
});

//tai khoan vo hieu luc
router.get("/taikhoan/vohieuluc", function (req, res) {
  taikhoan.getTKVoHieuLuc(function (err, data) {
    res.status(200).json(data);
  });
});

//search TK_ID
router.get("/taikhoan/search/:id&:hieuluc1&:hieuluc2", function (req, res) {
  var id = req.params.id;
  var hieuluc1 = req.params.hieuluc1;
  var hieuluc2 = req.params.hieuluc2;
  taikhoan.searchTK_ID(id, hieuluc1, hieuluc2, function (err, data) {
    res.status(200).json(data);
  });
});

//cap nhat mat khau
router.post("/taikhoan/updateMK/:TK_ID", function (req, res) {
  var TK_ID = req.body.TK_ID;
  var TK_PASSWORD = req.body.TK_PASSWORD;
  taikhoan.updateMK(TK_ID, TK_PASSWORD, function (err, data) {
    if (err) {
      res.status(404).json({ message: "ERR" });
    } else {
      res.status(200).json({ message: "đã cập nhật mật khẩu tài khoản ID: " + TK_ID });
    }
  });
});
//------------
//Cap nhat
router.post("/taikhoan/update", function (req, res) {
  var TK_ID = req.body.TK_ID;
  var TK_HOTEN = req.body.TK_HOTEN;
  var TK_DONVI = req.body.TK_DONVI;
  var TK_LOAI = req.body.TK_LOAI;
  var TK_QUYEN = req.body.TK_QUYEN;

  taikhoan.updateUser(TK_ID, TK_HOTEN, TK_DONVI, TK_LOAI, TK_QUYEN, function (err, data) {
    if (err) {
      res.status(404).json({ message: "ERR" });
    } else {
      // res.status(200).json({ message: "đã cập nhật thành công tài khoản ID: " + TK_ID });
      return res.redirect("/taikhoan");
    }
  });
});

// ---------------------------------------------Test

//-------------Xe
//render trang xe
router.get("/xe", function (req, res) {
  xe.allXe(function (err, data) {
    res.render("./../api/views/xe", { xe: data });
  });
});

//get all xe
router.get("/xe/all", function (req, res) {
  xe.allXe(function (err, data) {
    res.status(200).json(data);
  });
});
//Xe VITRI
router.get("/xe/vitri", function (req, res) {
  xe.allXe(function (err, data) {
    res.status(200).json(data);
  });
});

//tim xe theo id
router.post("/xe/find", function (req, res) {
  var XE_ID = req.body.XE_ID;
  xe.findXeByID(XE_ID, function (err, data) {
    res.status(200).json(data);
  });
});

//them xe
router.post("/xe", function (req, res) {
  var XE_IMEI = req.body.XE_IMEI;
  var XE_NAMSANXUAT = req.body.XE_NAMSANXUAT;
  var XE_GHICHU = req.body.XE_GHICHU;

  if (XE_IMEI == null) {
    res.status(404).json({ message: "XE_IMEI null" });
  }
  if (XE_NAMSANXUAT == null) {
    res.status(404).json({ message: "XE_NAMSANXUAT null" });
  }
  if (XE_GHICHU == null) {
    res.status(404).json({ message: "XE_GHICHU null" });
  }

  xe.addXe(XE_IMEI, XE_NAMSANXUAT, XE_GHICHU, 0, "", function (err, data) {
    if (err) {
      res.status(404).json({ message: "XE_IMEI null" });
    } else {
      res.status(200).json({ message: "Đã thêm thành công!" });
    }
  });
});

router.post("/xe/delete/:XE_ID", function (req, res) {
  var XE_ID = req.body.XE_ID;
  xe.deleteXe(XE_ID, function (err, data) {
    if (err.name == "SequelizeForeignKeyConstraintError") {
      // res.status(202).json(err.name);
      res.status(202).json("fk");
    } else {
      // res.status(200).json({ message: "đã xóa thành công tài khoản ID: " + TK_ID });
      res.status(200).json("ok");
    }
  });
});

// //update vi tri xe
// router.post("/xe/update/:XE_ID", function (req, res) {
//   var XE_ID = req.body.XE_ID;
//   var XE_VITRI = req.body.XE_VITRI;
//   xe.updateXe(XE_ID, XE_VITRI, function (err, data) {
//     if (err) {
//       res.status(404).json({ message: "ERR" });
//     } else {
//       res.status(200).json({
//         message: "đã cập nhật thành công vitri cua xe có ID: " + XE_ID
//       });
//     }
//   });
// });
// update xe
router.post("/xe/updateInfo/:XE_ID", function (req, res) {
  var XE_ID = req.body.XE_ID;
  var XE_NAMSANXUAT = req.body.XE_NAMSANXUAT;
  var XE_GHICHU = req.body.XE_GHICHU;
  xe.updateXeAllInf(XE_ID, XE_NAMSANXUAT, XE_GHICHU, function (err, data) {
    if (err) {
      res.status(404).json({ message: "ERR" });
    } else {
      // res.status(200).json({ message: "đã cập nhật thành công lỗi ID: " + LOI_ID });
      return res.redirect("/xe");
    }
  });
});

//update trang thai xe
router.post("/xe/updateTT/:XE_ID", function (req, res) {
  var XE_ID = req.body.XE_ID;
  var XE_TRANGTHAI = req.body.XE_TRANGTHAI;
  var XE_IMEI = req.body.XE_IMEI;
  xe.updateTrangThai(XE_ID, XE_IMEI, XE_TRANGTHAI, function (err, data) {
    if (err) {
      res.status(404).json({ message: "ERR" });
    } else {
      res.status(404).json({ message: "Cập nhật thành công trạng thái" + XE_TRANGTHAI });
    }
  });
});

//update vi tri xe
router.post("/xe/update/:XE_ID", function (req, res) {
  var XE_ID = req.body.XE_ID;
  var XE_LAT = req.body.XE_LAT;
  var XE_LNG = req.body.XE_LNG;
  var XE_IMEI = req.body.XE_IMEI;
  xe.updateXe(XE_ID, XE_IMEI, XE_LAT, XE_LNG, function (err, data) {
    if (err) {
      res.status(404).json({ message: "ERR" });
    } else {
      xe.findByID(XE_ID, function (err, data) {
        res.json("TTXe:" + data.XE_TRANGTHAI);
      });
      // res.json(
      //   xee
      // );
    }
  });
});

//-------------Lỗi
router.get("/loi", function (req, res) {
  loi.allLoi(function (err, data) {
    res.render("./../api/views/loi", { loi: data });
  });
});
// get all loi
router.get("/loi/all", function (req, res) {
  loi.allLoi(function (err, data) {
    res.status(200).json(data);
  });
});

// tìm lỗi theo id
router.post("/loi/find", function (req, res) {
  var LOI_ID = req.body.LOI_ID;
  loi.findLoiByID(LOI_ID, function (err, data) {
    res.status(200).json(data);
  });
});

// tìm lỗi theo id
router.get("/loi/:LOI_ID", function (req, res) {
  var LOI_ID = req.params.LOI_ID;
  loi.findByID(LOI_ID, function (err, data) {
    res.status(200).json(data);
  });
});

//them loi
router.post("/loi", function (req, res) {
  var LOI_ID = req.body.LOI_ID;
  var LOI_TEN = req.body.LOI_TEN;
  var LOI_MOTA = req.body.LOI_MOTA;
  if (LOI_ID == null) {
    res.status(404).json({ message: "LOI_ID null" });
  }
  if (LOI_TEN == null) {
    res.status(404).json({ message: "LOI_TEN null" });
  }
  if (LOI_MOTA == null) {
    res.status(404).json({ message: "LOI_MOTA null" });
  }
  loi.addLoi(LOI_ID, LOI_TEN, LOI_MOTA, function (err, data) {
    if (err) {
      res.status(404).json({ message: "ERR!" });
    } else {
      res.status(200).json({ message: "đã thêm thành công!" });
    }
  });
});

router.post("/loi/delete/:LOI_ID", function (req, res) {
  var LOI_ID = req.body.LOI_ID;
  loi.deleteLoi(LOI_ID, function (err, data) {
    if (err.name == "SequelizeForeignKeyConstraintError") {
      // res.status(202).json(err.name);
      res.status(202).json("fk");
    } else {
      // res.status(200).json({ message: "đã xóa thành công tài khoản ID: " + TK_ID });
      res.status(200).json("ok");
    }
  });
});

router.post("/loi/update/:LOI_ID", function (req, res) {
  var LOI_ID = req.body.LOI_ID;
  var LOI_TEN = req.body.LOI_TEN;
  var LOI_MOTA = req.body.LOI_MOTA;
  loi.updateLoi(LOI_ID, LOI_TEN, LOI_MOTA, function (err, data) {
    if (err) {
      res.status(404).json({ message: "ERR" });
    } else res.status(200).json({ message: "đã cập nhật thành công lỗi ID: " + LOI_ID });
  });
});

router.post("/loi/update", function (req, res) {
  var LOI_ID = req.body.LOI_ID;
  var LOI_TEN = req.body.LOI_TEN;
  var LOI_MOTA = req.body.LOI_MOTA;
  loi.updateLoi(LOI_ID, LOI_TEN, LOI_MOTA, function (err, data) {
    if (err) {
      res.status(404).json({ message: "ERR" });
    } else {
      // res.status(200).json({ message: "đã cập nhật thành công lỗi ID: " + LOI_ID });
      return res.redirect("/loi");
    }
  });
});
//Cập nhật khuôn viên
router.get("/khuonvien", function (req, res) {
  res.render("./../api/views/khuonvien");
});

//----Quản lý
//-----------Render Mượn trả
router.get("/muontra", function (req, res) {
  muontra.allMuonTra(function (err, data) {
    res.render("./../api/views/muontra", { muontra: data });
  });
});

//Get all muon tra
router.get("/muontra/all", function (req, res) {
  muontra.allMuonTra(function (err, data) {
    res.status(200).json(data);
  });
});

//get chua tra
router.get("/muontra/chuatra", function (req, res) {
  muontra.getChuaTra(function (err, data) {
    res.status(200).json(data);
  });
});

//get muon tra theo MT_ID
router.post("/muontra/find", function (req, res) {
  var MUONTRA_ID = req.body.MUONTRA_ID;
  muontra.findMuonTraByID(MUONTRA_ID, function (err, data) {
    res.status(200).json(data);
  });
});

// Muon tra theo XE_ID
router.get("/muontra/xe/:XE_ID", muontraRoute.viewMuonTraXe);

// Muon tra theo TK_ID
router.get("/muontra/:TK_ID", muontraRoute.viewMuonTra);

//-----------Vi phạm

router.get("/vipham", function (req, res) {
  vipham.allViPham(function (err, data) {
    res.render("./../api/views/vipham", { vipham: data });
  });
});
//get all
router.get("/vipham/all", function (req, res) {
  vipham.allViPham(function (err, data) {
    res.status(200).json(data);
  });
});

//get chua xu ly
router.get("/vipham/chuaxuly", function (req, res) {
  vipham.VP_ChuaXuLy(function (err, data) {
    res.status(200).json(data);
  });
});

//vi pham - tai khoan
router.get("/vipham/taikhoan/:TK_ID", viphamRoute.viewTaiKhoan);

//vi pham - xe
router.get("/vipham/xe/:XE_ID", viphamRoute.viewXe);

//vi pham - cap nhat xu ly
router.post("/vipham/updateXuLy", viphamRoute.updateXuLy);

//-----------Hư hỏng
router.get("/huhong", function (req, res) {
  huhong.allHuHong(function (err, data) {
    res.render("./../api/views/huhong", { huhong: data });
  });
});

//get all huhong
router.get("/huhong/all", function (req, res) {
  huhong.allHuHong(function (err, data) {
    res.status(200).json(data);
  });
});

//find theo id
router.post("/huhong/find", function (req, res) {
  var HH_ID = req.body.HH_ID;
  huhong.findHuHongByID(HH_ID, function (err, data) {
    res.status(200).json(data);
  });
});

// Hu hong theo TK_ID
router.get("/huhong/taikhoan/:TK_ID", huhongRoute.viewHuHong);

// Hu hong theo XE_ID
router.get("/huhong/xe/:XE_ID", huhongRoute.viewHuHongXe);

//hh dang cho
router.get("/huhong/huhongdangcho", function (req, res) {
  huhong.getHuHongDangCho(function (err, data) {
    res.status(200).json(data);
  });
});

//hh đang sửa
router.get("/huhong/huhongdangsua", function (req, res) {
  huhong.getHuHongDangSua(function (err, data) {
    res.status(200).json(data);
  });
});

//hh đã sửa
router.get("/huhong/huhongdasua", function (req, res) {
  huhong.getHuHongDaSua(function (err, data) {
    res.status(200).json(data);
  });
});

//hh báo sai
router.get("/huhong/huhongbaosai", function (req, res) {
  huhong.getHuHongBaoSai(function (err, data) {
    res.status(200).json(data);
  });
});

//update trạng thái hư hỏng
router.post("/huhong/update-trangthai/:HH_ID", function (req, res) {
  var HH_ID = req.body.HH_ID;
  var HH_TRANGTHAI = req.body.HH_TRANGTHAI;
  huhong.updateTrangThaiHuHong(HH_ID, HH_TRANGTHAI, function (err, data) {
    if (err) {
      // res.status(404).json({ message: "ERR" });
      res.status(404).json(err.name);
      // return res.redirect("/taikhoan");
    } else {
      res.status(200).json({ message: "đã cập nhật trạng thái hư hỏng ID: " + HH_ID });
    }
  });
});
//----------Khuon vien
//get toa do
router.get("/khuonvien/getToaDo", function (req, res) {
  khuonvien.allToaDo(function (err, data) {
    res.status(202).json(data);
  });
});

router.get("/khuonvien-off", function (req, res) {
  res.render("./../api/views/khuonvien-off");
});

//add toa do
router.post("/khuonvien/", function (req, res) {
  // var TK_ID = req.body.TK_ID;
  var KV_LAT = req.body.KV_LAT;
  var KV_LNG = req.body.KV_LNG;

  khuonvien.addKV(KV_LAT, KV_LNG, 1, function (err, data) {
    if (err) {
      res.status(404).json({ message: "ERR!" });
    } else {
      res.status(200).json({ message: "đã thêm tọa độ thành công!" });
      // res.redirect("/taikhoan");
    }
  });
});

//cap nhat trang thai 0
router.post("/khuonvien/update", function (req, res) {
  var KV_TRANGTHAI = req.body.KV_TRANGTHAI;
  khuonvien.updateKV_TrangThai(KV_TRANGTHAI, function (err, data) {
    if (err) {
      res.status(404).json({ message: "ERR" });
    } else {
      res.status(200).json({ message: "đã cập nhật thành công trang thai toa do! " });
    }
  });
});

//-------------------------Thống kê
//mượn trả
router.get("/tk-muontra", function (req, res) {
  res.render("./../api/views/tk-muontra");
});

module.exports = router;
