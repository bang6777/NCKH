"use strict";
var express = require("express");
var router = express.Router();
var taikhoan = require("../controller/taikhoan_Ctrl");
var xe = require("../controller/xe_Ctr");
var loi = require("../controller/loi_Ctr");
var huhong = require("../controller/huhong_Ctr");
var muontra = require("../controller/muontra_Ctr");
var vipham = require("../controller/vipham_Ctr");
var muontraRoute = require("./muontra_Route");
var huhongRoute = require("./huhong_Route");

//Login
router.get("/login", function(req, res) {
  res.render("./../api/views/login");
});

// Trang chủ
router.get("/", function(req, res) {
  res.render("./../api/views/index");
});

//----Danh mục
//------------- Tài Khoản
router.get("/taikhoan", function(req, res) {
  taikhoan.allUser(function(err, data) {
    res.render("./../api/views/taikhoan", { taikhoan: data });
  });
});

//-----------add tài khoản
router.post("/taikhoan", function(req, res) {
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
  taikhoan.addUser(TK_ID, TK_PASSWORD, TK_HOTEN, TK_QUYEN, TK_DONVI, TK_LOAI, 1, function(err, data) {
    if (err) {
      res.status(404).json({ message: "ERR!" });
    } else {
      res.status(200).json({ message: "đã thêm thành công!" });
      // res.redirect("/taikhoan");
    }
  });
});

// router.post("/taikhoan/delete/:TK_ID", function(req, res) {
//   var TK_ID = req.body.TK_ID;
//   taikhoan.deleteUser(TK_ID, function(err, data) {
//     if (err) {
//       res.status(404).json({ message: "ERR" });
//     } else {
//       // res.status(200).json({ message: "đã xóa thành công tài khoản ID: " + TK_ID });
//       return res.redirect("/taikhoan");
//     }
//   });
// });
// router.post("/taikhoan/update/:TK_ID", function(req, res) {
//   var TK_ID = req.body.TK_ID;
//   var TK_HOTEN = req.body.TK_HOTEN;
//   var TK_DONVI = req.body.TK_DONVI;
//   var TK_LOAI = req.body.TK_LOAI;
//   var TK_QUYEN = req.body.TK_QUYEN;
//   taikhoan.updateUser(TK_ID, TK_HOTEN, TK_DONVI, TK_LOAI, TK_QUYEN, function(err, data) {
//     if (err) {
//       res.status(404).json({ message: "ERR" });
//     } else {
//       res.status(200).json({ message: "đã cập nhật thành công tài khoản ID: " + TK_ID });
//       // return res.redirect("/taikhoan");
//     }
//   });
// });
// ---------------------------------------------Test
//get all TK
router.get("/taikhoan/all", function(req, res) {
  taikhoan.allUser(function(err, data) {
    res.status(200).json(data);
  });
});

//get 1 TK theo id
router.post("/taikhoan/find", function(req, res) {
  var TK_ID = req.body.TK_ID;
  taikhoan.findTKByPK(TK_ID, function(err, data) {
    res.status(200).json(data);
  });
});

//cap nhat hieu luc
router.post("/taikhoan/update-hieuluc/:TK_ID", function(req, res) {
  var TK_ID = req.body.TK_ID;
  var TK_HIEULUC = req.body.TK_HIEULUC;
  taikhoan.updateHieuLuc(TK_ID, TK_HIEULUC, function(err, data) {
    if (err) {
      res.status(404).json({ message: "ERR" });
    } else {
      res.status(200).json({ message: "đã cập nhật hiệu lực tài khoản ID: " + TK_ID });
    }
  });
});

//cap nhat thong tin
router.post("/taikhoan/update/:TK_ID", function(req, res) {
  var TK_ID = req.body.TK_ID;
  var TK_HOTEN = req.body.TK_HOTEN;
  var TK_DONVI = req.body.TK_DONVI;
  var TK_LOAI = req.body.TK_LOAI;
  var TK_QUYEN = req.body.TK_QUYEN;
  taikhoan.updateUser(TK_ID, TK_HOTEN, TK_DONVI, TK_LOAI, TK_QUYEN, function(err, data) {
    if (err) {
      res.status(404).json({ message: "ERR" });
    } else {
      res.status(200).json({ message: "đã cập nhật thông tin tài khoản ID: " + TK_ID });
    }
  });
});

//xoa taikhoan
router.post("/taikhoan/delete/:TK_ID", function(req, res) {
  var TK_ID = req.body.TK_ID;
  taikhoan.deleteUser(TK_ID, function(err, data) {
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
router.get("/taikhoan/conhieuluc", function(req, res) {
  taikhoan.getTKConHieuLuc(function(err, data) {
    res.status(200).json(data);
  });
});

//tai khoan vo hieu luc
router.get("/taikhoan/vohieuluc", function(req, res) {
  taikhoan.getTKVoHieuLuc(function(err, data) {
    res.status(200).json(data);
  });
});
//------------
//Cap nhat
router.post("/taikhoan/update", function(req, res) {
  var TK_ID = req.body.TK_ID;
  var TK_HOTEN = req.body.TK_HOTEN;
  var TK_DONVI = req.body.TK_DONVI;
  var TK_LOAI = req.body.TK_LOAI;
  var TK_QUYEN = req.body.TK_QUYEN;

  taikhoan.updateUser(TK_ID, TK_HOTEN, TK_DONVI, TK_LOAI, TK_QUYEN, function(err, data) {
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
router.get("/xe", function(req, res) {
  xe.allXe(function(err, data) {
    res.render("./../api/views/xe", { xe: data });
  });
});

//get all xe
router.get("/xe/all", function(req, res) {
  xe.allXe(function(err, data) {
    res.status(200).json(data);
  });
});
//Xe VITRI
router.get("/xe/vitri", function(req, res) {
  xe.allXe(function(err, data) {
    res.status(200).json(data);
  });
});

//tim xe theo id
router.post("/xe/find", function(req, res) {
  var XE_ID = req.body.XE_ID;
  xe.findXeByID(XE_ID, function(err, data) {
    res.status(200).json(data);
  });
});

//them xe
router.post("/xe", function(req, res) {
  var XE_ID = req.body.XE_ID;
  var XE_NAMSANXUAT = req.body.XE_NAMSANXUAT;
  var XE_GHICHU = req.body.XE_GHICHU;

  if (XE_ID == null) {
    res.status(404).json({ message: "XE_ID null" });
  }
  if (XE_NAMSANXUAT == null) {
    res.status(404).json({ message: "XE_NAMSANXUAT null" });
  }
  if (XE_GHICHU == null) {
    res.status(404).json({ message: "XE_GHICHU null" });
  }

  xe.addXe(XE_ID, XE_NAMSANXUAT, XE_GHICHU, function(err, data) {
    if (err) {
      res.status(404).json({ message: "XE_ID null" });
    } else {
      res.status(200).json({ message: "Đã thêm thành công!" });
    }
  });
});

router.post("/xe/delete/:XE_ID", function(req, res) {
  var XE_ID = req.body.XE_ID;
  xe.deleteXe(XE_ID, function(err, data) {
    if (err.name == "SequelizeForeignKeyConstraintError") {
      // res.status(202).json(err.name);
      res.status(202).json("fk");
    } else {
      // res.status(200).json({ message: "đã xóa thành công tài khoản ID: " + TK_ID });
      res.status(200).json("ok");
    }
  });
});

//update vi tri xe
router.post("/xe/update/:XE_ID", function(req, res) {
  var XE_ID = req.body.XE_ID;
  var XE_VITRI = req.body.XE_VITRI;
  xe.updateXe(XE_ID, XE_VITRI, function(err, data) {
    if (err) {
      res.status(404).json({ message: "ERR" });
    } else {
      res.status(200).json({
        message: "đã cập nhật thành công vitri cua xe có ID: " + XE_ID
      });
    }
  });
});
// update xe
router.post("/xe/updateInfo/:XE_ID", function(req, res) {
  var XE_ID = req.body.XE_ID;
  var XE_NAMSANXUAT = req.body.XE_NAMSANXUAT;
  var XE_GHICHU = req.body.XE_GHICHU;
  xe.updateXeAllInf(XE_ID, XE_NAMSANXUAT, XE_GHICHU, function(err, data) {
    if (err) {
      res.status(404).json({ message: "ERR" });
    } else {
      // res.status(200).json({ message: "đã cập nhật thành công lỗi ID: " + LOI_ID });
      return res.redirect("/xe");
    }
  });
});
//-------------Lỗi
router.get("/loi", function(req, res) {
  loi.allLoi(function(err, data) {
    res.render("./../api/views/loi", { loi: data });
  });
});
// get all loi
router.get("/loi/all", function(req, res) {
  loi.allLoi(function(err, data) {
    res.status(200).json(data);
  });
});

// tìm lỗi theo id
router.post("/loi/find", function(req, res) {
  var LOI_ID = req.body.LOI_ID;
  loi.findLoiByID(LOI_ID, function(err, data) {
    res.status(200).json(data);
  });
});

//them loi
router.post("/loi", function(req, res) {
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
  loi.addLoi(LOI_ID, LOI_TEN, LOI_MOTA, function(err, data) {
    if (err) {
      res.status(404).json({ message: "ERR!" });
    } else {
      res.status(200).json({ message: "đã thêm thành công!" });
    }
  });
});

router.post("/loi/delete/:LOI_ID", function(req, res) {
  var LOI_ID = req.body.LOI_ID;
  loi.deleteLoi(LOI_ID, function(err, data) {
    if (err.name == "SequelizeForeignKeyConstraintError") {
      // res.status(202).json(err.name);
      res.status(202).json("fk");
    } else {
      // res.status(200).json({ message: "đã xóa thành công tài khoản ID: " + TK_ID });
      res.status(200).json("ok");
    }
  });
});

router.post("/loi/update/:LOI_ID", function(req, res) {
  var LOI_ID = req.body.LOI_ID;
  var LOI_TEN = req.body.LOI_TEN;
  var LOI_MOTA = req.body.LOI_MOTA;
  loi.updateLoi(LOI_ID, LOI_TEN, LOI_MOTA, function(err, data) {
    if (err) {
      res.status(404).json({ message: "ERR" });
    } else res.status(200).json({ message: "đã cập nhật thành công lỗi ID: " + LOI_ID });
  });
});

router.post("/loi/update", function(req, res) {
  var LOI_ID = req.body.LOI_ID;
  var LOI_TEN = req.body.LOI_TEN;
  var LOI_MOTA = req.body.LOI_MOTA;
  loi.updateLoi(LOI_ID, LOI_TEN, LOI_MOTA, function(err, data) {
    if (err) {
      res.status(404).json({ message: "ERR" });
    } else {
      // res.status(200).json({ message: "đã cập nhật thành công lỗi ID: " + LOI_ID });
      return res.redirect("/loi");
    }
  });
});
//Cập nhật khuôn viên
router.get("/khuonvien", function(req, res) {
  res.render("./../api/views/khuonvien");
});

//----Quản lý
//-----------Mượn trả
router.get("/muontra", function(req, res) {
  muontra.allMuonTra(function(err, data) {
    res.render("./../api/views/muontra", { muontra: data });
  });
});
// Muon tra theo ID
router.get("/muontra/:TK_ID", muontraRoute.viewMuonTra);
//-----------Vi phạm

// router.get("/vipham", function (req, res) {
//   res.render("./../api/views/vipham");
// });

router.get("/vipham", function(req, res) {
  vipham.allViPham(function(err, data) {
    res.render("./../api/views/vipham", { vipham: data });
  });
});

router.get("/vipham/all", function(req, res) {
  vipham.allViPham(function(err, data) {
    res.status(200).json(data);
  });
});
//-----------Hư hỏng
router.get("/huhong", function(req, res) {
  huhong.allHuHong(function(err, data) {
    res.render("./../api/views/huhong", { huhong: data });
  });
});

//get all huhong
router.get("/huhong/all", function(req, res) {
  huhong.allHuHong(function(err, data) {
    res.status(200).json(data);
  });
});

//find theo id
router.post("/huhong/find", function(req, res) {
  var HH_ID = req.body.HH_ID;
  huhong.findHuHongByID(HH_ID, function(err, data) {
    res.status(200).json(data);
  });
});
// Hu hong theo ID
// router.get("/huhong/:TK_ID", function(req, res) {
//   huhongRoute.viewHuHong(function(err, data) {
//     res.status(200).json(data);
//   });
// });

//hh dang cho
router.get("/huhong/huhongdangcho", function(req, res) {
  huhong.getHuHongDangCho(function(err, data) {
    res.status(200).json(data);
  });
});

//hh đang sửa
router.get("/huhong/huhongdangsua", function(req, res) {
  huhong.getHuHongDangSua(function(err, data) {
    res.status(200).json(data);
  });
});

//hh đã sửa
router.get("/huhong/huhongdasua", function(req, res) {
  huhong.getHuHongDaSua(function(err, data) {
    res.status(200).json(data);
  });
});

//hh báo sai
router.get("/huhong/huhongbaosai", function(req, res) {
  huhong.getHuHongBaoSai(function(err, data) {
    res.status(200).json(data);
  });
});

module.exports = router;

// module.exports = function(app) {
//   let productsCtrl = require('../controller/taikhoan_Ctrl');
//   var task = require('./../controller/taikhoan_Ctrl');
//   // todoList Routes
//   // app.route('/taikhoan')
//     // .get(productsCtrl.get)
//     // .post(productsCtrl.store);

//   // app.route('/taikhoanInsert')
//   // .post(productsCtrl.store);

//   // app.route('/taikhoan/:TK_ID')
//     // .get(productsCtrl.detail)
//     // .put(productsCtrl.update)
//     // .delete(productsCtrl.delete);
//   app.get('/taikhoan',task.allUser);
// };
