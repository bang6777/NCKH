var viphamCtr = require("../controller/vipham_Ctr");
var xeCtr = require("../controller/xe_Ctr");

exports.viewTaiKhoan = function(req, res) {
  var TK_ID = req.params.TK_ID;
  viphamCtr.vipham_taikhoan(TK_ID, function(err, data) {
    res.json(data);
  });
};

exports.viewXe = function(req, res) {
  var XE_ID = req.params.XE_ID;
  viphamCtr.vipham_xe(XE_ID, function(err, data) {
    res.json(data);
  });
};

exports.viewChiTietViPham = function(req, res) {
  var VP_ID = req.body.VP_ID;
  var MUONTRA_ID = req.body.MUONTRA_ID;
  viphamCtr.vipham_chitiet(VP_ID, MUONTRA_ID, function(err, data) {
    res.json(data);
    console.log(data);
  });
};

exports.updateXuLy = function(req, res) {
  var VP_ID = req.body.VP_ID;
  var VP_TRANGTHAI = req.body.VP_TRANGTHAI;
  var MUONTRA_ID = req.body.MUONTRA_ID;
  //cap nhat trang thai xu ly
  viphamCtr.updateXuLy(VP_ID, VP_TRANGTHAI, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      //tìm id xe
      viphamCtr.vipham_chitiet(VP_ID, MUONTRA_ID, function(err, data) {
        {
          if (err) console.log(err);
          else {
            xe_id = data.muontra.xeXEID;
            //cập nhật trạng thái xe = 0
            xeCtr.updateTrangThaiXe(xe_id, 0, function(err, data) {
              res.json(data);
            });
          }
        }
      });
    }
  });
};

exports.thongkeViPham = function(req, res) {
  var tungay = req.body.tungay;
  var denngay = req.body.denngay;
  console.log(tungay + "---" + denngay);
  viphamCtr.ThongKeViPham(tungay, denngay, function(err, data) {
    res.json(data);
  });
};
