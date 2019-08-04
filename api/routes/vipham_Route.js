var viphamCtr = require("../controller/vipham_Ctr");

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
  var VP_ID = req.params.VP_ID;
  viphamCtr.vipham_chitiet(VP_ID, function(err, data) {
    res.json(data);
    console.log(data);
  });
};

exports.updateXuLy = function(req, res) {
  var VP_ID = req.body.VP_ID;
  var VP_TRANGTHAI = req.body.VP_TRANGTHAI;
  viphamCtr.updateXuLy(VP_ID, VP_TRANGTHAI, function(err, data) {
    res.json("ok");
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
