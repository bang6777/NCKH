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
var checkloi = require("../controller/checkloi_Ctrl");

var viphamRoute = require("./vipham_Route");
var muontraRoute = require("./muontra_Route");
var huhongRoute = require("./huhong_Route");

var checkloiRoute = require("./checkloi_Route");

const jwt = require("jsonwebtoken");
//Login
router.get("/login", function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("./../api/views/login", {
      error: req.flash("error")
    });
  }
});

// router.post("/login", function (req, res) {
//   var TK_ID = req.body.TK_ID;
//   var TK_PASSWORD = req.body.TK_PASSWORD;
//   if (TK_ID == null) {
//     res.status(404).json({ message: "TK_ID null" });
//   }
//   if (TK_PASSWORD == null) {
//     res.status(404).json({ message: "TK_Pwd null" });
//   }
//   taikhoan.checkLoginServer(TK_ID, TK_PASSWORD, function (err, data) {
//     if (err) {
//       res.status(200).json("err");
//     } else {
//       res.status(200).json("ok");
//     }
//   });
// });

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/",
    failureFlash: true
  })
  // ,function(req,res){
  // }
);

router.get("/signout", function (req, res) {
  req.logout();
  res.redirect("/");
});

// router.post("/api/login", (req, res) => {
//   jwt.sign({ taikhoan: taikhoan.TK_ID }, "secretkey", (err, token) => {
//     res.json({
//       token: token
//     });
//   });
// });

// Trang chủ
router.get("/", checkLoginServer, function (req, res) {
  // var sess = req.session;
  // if (req.session.TK_ID) {
  res.render("./../api/views/index");
  // } else {
  // res.redirect("/login");
  // }
});

//----Danh mục
//------------- Tài Khoản
router.get("/taikhoan", checkLoginServer, function (req, res) {
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

//get TK đang đăng nhập
router.get("/taikhoan-login", checkLoginServer, function (req, res) {
  res.json(req.user.TK_HOTEN);
});

//-------------Xe
//render trang xe
router.get("/xe", checkLoginServer, function (req, res) {
  xe.allXe(function (err, data) {
    res.render("./../api/views/xe", { xe: data });
  });
});

//get all xe
router.get("/xe/all", checkLoginServer, function (req, res) {
  xe.allXe(function (err, data) {
    res.status(200).json(data);
  });
});
//Xe VITRI
router.get("/xe/vitri", checkLoginServer, function (req, res) {
  xe.allXe(function (err, data) {
    res.status(200).json(data);
  });
});

//tim xe theo id
router.post("/xe/find", checkLoginServer, function (req, res) {
  var XE_ID = req.body.XE_ID;
  xe.findXeByID(XE_ID, function (err, data) {
    res.status(200).json(data);
  });
});

//them xe
router.post("/xe", checkLoginServer, function (req, res) {
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

router.post("/xe/delete/:XE_ID", checkLoginServer, function (req, res) {
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

// update xe
router.post("/xe/updateInfo/:XE_ID", checkLoginServer, function (req, res) {
  var XE_ID = req.body.XE_ID;
  var XE_IMEI = req.body.XE_IMEI;
  var XE_NAMSANXUAT = req.body.XE_NAMSANXUAT;
  var XE_GHICHU = req.body.XE_GHICHU;
  xe.updateXeAllInf(XE_ID, XE_IMEI, XE_NAMSANXUAT, XE_GHICHU, function (err, data) {
    if (err) {
      res.status(404).json({ message: "ERR" });
    } else {
      // res.status(200).json({ message: "đã cập nhật thành công lỗi ID: " + LOI_ID });
      return res.redirect("/xe");
    }
  });
});

//update trang thai xe Linh
router.put("/xe/updateTT", function (req, res) {
  var XE_ID = req.body.XE_ID;
  var XE_TRANGTHAI = req.body.XE_TRANGTHAI;
  var XE_IMEI = req.body.XE_IMEI;
  if (XE_TRANGTHAI == 0) {
    xe.findByID(XE_ID, function (err, xeObj) {
      // Kiểm tra trạng thái xe có đang mượn hay không trước khi cập nhật
      if (xeObj.XE_TRANGTHAI != 1) {
        res.status(200).json({ message: "C" });
      } else {
        xe.updateTrangThai(XE_ID, XE_IMEI, XE_TRANGTHAI, function (err, data) {
          console.log("err" + err);
          console.log("data" + data);

          if (err) {
            res.status(400).send(err);
          } else if (data) {
            xe.findByID(XE_ID, function (err, xeObj) {
              if (xeObj.XE_TRANGTHAI == 0) {
                //yÊu cầu trả xe
                muontra.traXe(XE_ID, xeObj.XE_LAT, xeObj.XE_LNG, function (err, result) {
                  console.log("err" + err);
                  if (err) {
                    xe.updateTrangThai(XE_ID, XE_IMEI, 1, function (err, result) { }); // Thất bại -> trả về 1 (đag mượn)
                    res.status(400).send(err);
                  } else {
                    res.status(200).json({ message: "Cập nhật thành công trạng thái 1 - " + XE_TRANGTHAI });
                  }
                });
              } else {
                res.status(200).json({ message: "Cập nhật thành công trạng thái 0 - " + XE_TRANGTHAI });
              }
            });
          } else res.status(400).json("Lỗi !");
        });
      }
    });
  } else res.status(400).send("Trạng thái trả xe không hợp lệ");
});

//update trang thai xe trang hu hong
router.post("/xe/updateTrangThai", function (req, res) {
  var XE_ID = req.body.XE_ID;
  var XE_TRANGTHAI = req.body.XE_TRANGTHAI;
  xe.updateTrangThaiXe(XE_ID, XE_TRANGTHAI, function (err, data) {
    if (err) {
      res.status(404).json({ message: "ERR" });
    } else {
      res.status(200).json({ message: "Cập nhật thành công trạng thái" + XE_TRANGTHAI });
    }
  });
});

// //update vi tri xe
// router.put("/xe/update/:XE_ID", function(req, res) {
//   var XE_ID = req.body.XE_ID;
//   var XE_LAT = req.body.XE_LAT;
//   var XE_LNG = req.body.XE_LNG;
//   var XE_IMEI = req.body.XE_IMEI;
//   xe.updateXe(XE_ID, XE_IMEI, XE_LAT, XE_LNG, function(err, data) {
//     if (err) {
//       res.status(404).json({ message: "ERR" });
//     } else {
//       xe.findByID(XE_ID, function(err, data) {
//         res.json("TTXe:" + data.XE_TRANGTHAI);
//       });
//     }
//   });
// });
/**************************************** */
function onSegment(p, q, r) {
  if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y)) return true;
  return false;
}

function orientation(p, q, r) {
  var val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  //alert(val);
  if (val == 0) return 0; // colinear
  return val > 0 ? 1 : 2; // clock or counterclock wise
}

function doIntersect(p1, q1, p2, q2) {
  // Find the four orientations needed for general and
  // special cases
  var o1 = orientation(p1, q1, p2);
  var o2 = orientation(p1, q1, q2);
  var o3 = orientation(p2, q2, p1);
  var o4 = orientation(p2, q2, q1);

  // General case
  if (o1 != o2 && o3 != o4) return true;

  // Special Cases
  // p1, q1 and p2 are colinear and p2 lies on segment p1q1
  if (o1 == 0 && onSegment(p1, p2, q1)) return true;

  // p1, q1 and p2 are colinear and q2 lies on segment p1q1
  if (o2 == 0 && onSegment(p1, q2, q1)) return true;

  // p2, q2 and p1 are colinear and p1 lies on segment p2q2
  if (o3 == 0 && onSegment(p2, p1, q2)) return true;

  // p2, q2 and q1 are colinear and q1 lies on segment p2q2
  if (o4 == 0 && onSegment(p2, q1, q2)) return true;

  return false; // Doesn't fall in any of the above cases
}

/**************************************** */

//update vi tri xe
router.put("/xe/update", function (req, res) {
  var XE_ID = req.body.XE_ID;
  var XE_LAT = req.body.XE_LAT;
  var XE_LNG = req.body.XE_LNG;
  var XE_IMEI = req.body.XE_IMEI;
  if (XE_ID && XE_IMEI && XE_LAT && XE_LNG && XE_LAT != 0 && XE_LNG != 0) {
    xe.updateXe(XE_ID, XE_IMEI, XE_LAT, XE_LNG, function (err, data) {
      if (err) {
        res.json({ message: "ERR1" });
      } else {
        //get tọa độ xe
        var p = { x: XE_LNG, y: XE_LAT };
        //kiem tra Is inside
        khuonvien.getLatLng(function (err, data) {
          if (err) {
            console.log(err);
          } else {
            var kq;
            var epsilon = 0.000001;
            var inf = 10000;
            var i,
              polygon = [];

            for (i = 0; i < data.length; i++) {
              polygon.push({ x: data[i].KV_LNG, y: data[i].KV_LAT });
            }

            var n = polygon.length;

            // Create a point for line segment from p to infinite
            var extreme = { x: inf, y: p.y };

            // Count intersections of the above line with sides of polygon
            var count = 0,
              i = 0;
            do {
              var next = (i + 1) % n;

              //neu trung voi dinh
              if ((p.y == polygon[i].y && p.x == polygon[i].x) || (p.y == polygon[next].y && p.x == polygon[next].x)) {
                console.log("trung dinh");
                kq = true;
                break;
              }

              //neu trung voi canh
              else {
                if (p.y == polygon[i].y || p.y == polygon[next].y) {
                  p.y = p.y + epsilon;
                }
                // Check if the line segment from 'p' to 'extreme' intersects
                // with the line segment from 'polygon[i]' to 'polygon[next]'
                if (doIntersect(polygon[i], polygon[next], p, extreme)) {
                  // If the point 'p' is colinear with line segment 'i-next',
                  // then check if it lies on segment. If it lies, return true,
                  // otherwise false

                  // cout << (orientation(polygon[i], p, polygon[next]));
                  if (orientation(polygon[i], p, polygon[next]) == 0) {
                    kq = onSegment(polygon[i], p, polygon[next]);
                  }

                  count++;
                }
                i = next;
              }
              // Return true if count is odd, false otherwise
              kq = count % 2 == 1; // Same as (count%2 == 1)
            } while (i != 0);
          }

          //nếu kq = false => xe ở ngoài => thêm vp
          if (kq == false) {
            xe.updateTrangThai(XE_ID, XE_IMEI, 3, function (err, data) {
              // Cập nhật trạng thái xe dag vượt khỏi khuôn viên
              if (err) console.log(err);
            });
            checkloi.findMuontraID_Xe(XE_ID, function (err, data) {
              if (err) {
                console.log(err);
              } else {
                var mt_id = data.MUONTRA_ID;
                var vp_lat = XE_LAT;
                var vp_lng = XE_LNG;

                checkloi.findIDLoi_MT(mt_id, function (err, data) {
                  //neu chua co loi
                  if (data == null) {
                    //them loi
                    checkloi.addVP(mt_id, vp_lat, vp_lng, function (err, data) {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("Ghi nhận thành công vi phạm vượt khuôn viên : " + mt_id);
                      }
                    });
                  } else {
                    console.log("Đã tồn tại vi phạm! ");
                  }
                });
              }
            });
          } else if (kq == true) {
            console.log("Xe ở trong");
            //Cập nhật trạng thái xe đang mượn ở trong khuôn viên
            muontra.kiemTraXeDangMuon(XE_ID, function (err, result) {
              if (result) {
                // Xe dag mượn -> Tiếp tục trả về là xe dag mượn
                xe.updateTrangThai(XE_ID, XE_IMEI, 1, function (err, data) {
                  if (err) console.log(err);
                });
              } else {
                // Xe không mượn -> trả về là k có mượn
                xe.updateTrangThai(XE_ID, XE_IMEI, 0, function (err, data) {
                  if (err) console.log(err);
                });
              }
            });
          }
          xe.findByID(XE_ID, function (err, data) {
            res.json("TTXe:" + data.XE_TRANGTHAI);
          });
        });
      }
    });
  } else {
    res.json({ message: "ERR1" });
  }
});

//-------------Lỗi
router.get("/loi", checkLoginServer, function (req, res) {
  loi.allLoi(function (err, data) {
    res.render("./../api/views/loi", { loi: data });
  });
});
// get all loi
router.get("/loi/all", checkLoginServer, function (req, res) {
  loi.allLoi(function (err, data) {
    res.status(200).json(data);
  });
});

// tìm lỗi theo id
router.post("/loi/find", checkLoginServer, function (req, res) {
  var LOI_ID = req.body.LOI_ID;
  loi.findLoiByID(LOI_ID, function (err, data) {
    res.status(200).json(data);
  });
});

// tìm lỗi theo id
router.get("/loi/:LOI_ID", checkLoginServer, function (req, res) {
  var LOI_ID = req.params.LOI_ID;
  loi.findByID(LOI_ID, function (err, data) {
    res.status(200).json(data);
  });
});

//them loi
router.post("/loi", checkLoginServer, function (req, res) {
  var LOI_TEN = req.body.LOI_TEN;
  var LOI_MOTA = req.body.LOI_MOTA;

  if (LOI_TEN == null) {
    res.status(404).json({ message: "LOI_TEN null" });
  }
  if (LOI_MOTA == null) {
    res.status(404).json({ message: "LOI_MOTA null" });
  }
  loi.addLoi(LOI_TEN, LOI_MOTA, function (err, data) {
    if (err) {
      res.status(404).json({ message: "ERR!" });
    } else {
      res.status(200).json({ message: "đã thêm thành công!" });
    }
  });
});

router.post("/loi/delete/:LOI_ID", checkLoginServer, function (req, res) {
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

router.post("/loi/update/:LOI_ID", checkLoginServer, function (req, res) {
  var LOI_ID = req.body.LOI_ID;
  var LOI_TEN = req.body.LOI_TEN;
  var LOI_MOTA = req.body.LOI_MOTA;
  loi.updateLoi(LOI_ID, LOI_TEN, LOI_MOTA, function (err, data) {
    if (err) {
      res.status(404).json({ message: "ERR" });
    } else res.status(200).json({ message: "đã cập nhật thành công lỗi ID: " + LOI_ID });
  });
});

router.post("/loi/update", checkLoginServer, function (req, res) {
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
router.get("/khuonvien", checkLoginServer, function (req, res) {
  res.render("./../api/views/khuonvien");
});

//----Quản lý
//-----------Render Mượn trả
router.get("/muontra", checkLoginServer, function (req, res) {
  muontra.allMuonTra(function (err, data) {
    res.render("./../api/views/muontra", { muontra: data });
  });
});

//Get all muon tra
router.get("/muontra/all", checkLoginServer, function (req, res) {
  muontra.allMuonTra(function (err, data) {
    res.status(200).json(data);
  });
});

//get chua tra
router.get("/muontra/chuatra", checkLoginServer, function (req, res) {
  muontra.getChuaTra(function (err, data) {
    res.status(200).json(data);
  });
});

//get muon tra theo MT_ID
router.post("/muontra/find", checkLoginServer, function (req, res) {
  var MUONTRA_ID = req.body.MUONTRA_ID;
  muontra.findMuonTraByID(MUONTRA_ID, function (err, data) {
    res.status(200).json(data);
  });
});

// Muon tra theo XE_ID
router.get("/muontra/xe/:XE_ID", checkLoginServer, muontraRoute.viewMuonTraXe);

// Muon tra theo TK_ID
router.get("/muontra/:TK_ID", checkLoginServer, muontraRoute.viewMuonTra);

// Ket thuc muon tra
router.put("/muontra/:TK_ID", muontraRoute.KetThucMuonTra);

//-----------Vi phạm

router.get("/vipham", checkLoginServer, function (req, res) {
  vipham.allViPham(function (err, data) {
    res.render("./../api/views/vipham", { vipham: data });
  });
});
//get all
router.get("/vipham/all", checkLoginServer, function (req, res) {
  vipham.allViPham(function (err, data) {
    res.status(200).json(data);
  });
});

//get chua xu ly
router.get("/vipham/chuaxuly", checkLoginServer, function (req, res) {
  vipham.VP_ChuaXuLy(function (err, data) {
    res.status(200).json(data);
  });
});

//get da xu ly
router.get("/vipham/daxuly", checkLoginServer, function (req, res) {
  vipham.VP_DaXuLy(function (err, data) {
    res.status(200).json(data);
  });
});

//vi pham - tai khoan
router.get("/vipham/taikhoan/:TK_ID", checkLoginServer, viphamRoute.viewTaiKhoan);

//vi pham - xe
router.get("/vipham/xe/:XE_ID", checkLoginServer, viphamRoute.viewXe);

//vi pham - cap nhat xu ly
router.post("/vipham/updateXuLy", checkLoginServer, viphamRoute.updateXuLy);

//vipham - chi tiet
router.post("/vipham/chitiet", checkLoginServer, viphamRoute.viewChiTietViPham);

//-----------Hư hỏng
router.get("/huhong", checkLoginServer, function (req, res) {
  huhong.allHuHong(function (err, data) {
    res.render("./../api/views/huhong", { huhong: data });
  });
});

//get all huhong
router.get("/huhong/all", checkLoginServer, function (req, res) {
  huhong.allHuHong(function (err, data) {
    res.status(200).json(data);
  });
});

//find theo id
router.post("/huhong/find", checkLoginServer, function (req, res) {
  var HH_ID = req.body.HH_ID;
  huhong.findHuHongByID(HH_ID, function (err, data) {
    res.status(200).json(data);
  });
});

// Hu hong theo TK_ID
router.get("/huhong/taikhoan/:TK_ID", checkLoginServer, huhongRoute.viewHuHong);

// Hu hong theo XE_ID
router.get("/huhong/xe/:XE_ID", checkLoginServer, huhongRoute.viewHuHongXe);

//hh dang cho
router.get("/huhong/huhongdangcho", checkLoginServer, function (req, res) {
  huhong.getHuHongDangCho(function (err, data) {
    res.status(200).json(data);
  });
});

//hh đang sửa
router.get("/huhong/huhongdangsua", checkLoginServer, function (req, res) {
  huhong.getHuHongDangSua(function (err, data) {
    res.status(200).json(data);
  });
});

//hh đã sửa
router.get("/huhong/huhongdasua", checkLoginServer, function (req, res) {
  huhong.getHuHongDaSua(function (err, data) {
    res.status(200).json(data);
  });
});

//hh báo sai
router.get("/huhong/huhongbaosai", checkLoginServer, function (req, res) {
  huhong.getHuHongBaoSai(function (err, data) {
    res.status(200).json(data);
  });
});

//update trạng thái hư hỏng
router.post("/huhong/update-trangthai/:HH_ID", checkLoginServer, function (req, res) {
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
router.get("/khuonvien/getToaDo", checkLoginServer, function (req, res) {
  khuonvien.allToaDo(function (err, data) {
    res.status(202).json(data);
  });
});

//get lat lng check loi
router.get("/khuonvien/getLatLng", checkLoginServer, function (req, res) {
  khuonvien.getLatLng(function (err, data) {
    res.json(data);
  });
});

//render
router.get("/khuonvien-off", checkLoginServer, function (req, res) {
  res.render("./../api/views/khuonvien-off");
});

//add toa do
router.post("/khuonvien/", checkLoginServer, function (req, res) {
  // var TK_ID = req.body.TK_ID;
  var KV_LAT = req.body.KV_LAT;
  var KV_LNG = req.body.KV_LNG;

  khuonvien.addKV(KV_LAT, KV_LNG, 1, req.user.TK_ID, function (err, data) {
    if (err) {
      res.status(404).json({ message: "ERR!" });
    } else {
      res.status(200).json({ message: "đã thêm tọa độ thành công!" });
      // res.redirect("/taikhoan");
    }
  });
});

//cap nhat trang thai 0
router.put("/khuonvien", checkLoginServer, function (req, res) {
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
router.get("/tk-muontra", checkLoginServer, function (req, res) {
  res.render("./../api/views/tk-muontra");
});
router.post("/tk-muontra", checkLoginServer, muontraRoute.thongkeMuontra);

//vi phạm
router.get("/tk-vipham", checkLoginServer, function (req, res) {
  res.render("./../api/views/tk-vipham");
});
router.post("/tk-vipham", viphamRoute.thongkeViPham);

//hư hỏng
router.get("/tk-huhong", checkLoginServer, function (req, res) {
  res.render("./../api/views/tk-huhong");
});
router.post("/tk-huhong", checkLoginServer, huhongRoute.thongkeHuHong);

//---------------------Check lỗi
router.get("/getMT_ID", checkLoginServer, checkloiRoute.getIDMT);
router.get("/getLOI_ID", checkLoginServer, checkloiRoute.getIDLOI);

function checkLoginServer(req, res, next) {
  if (req.isAuthenticated()) {
    //trả về true nếu đã đăng nhập rồi
    // res.send('Đã đăng nhập');
    return next();
  } else {
    return res.redirect("/login");
  }
}

module.exports = router; //Dòng này luôn ở cuối cùng nhé !
