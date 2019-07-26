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
  var MUONTRA_ID = req.params.MUONTRA_ID;
  viphamCtr.vipham_chitiet(MUONTRA_ID, function(err, data) {
    res.json(data);
  });
};

exports.updateXuLy = function(req, res) {
  var VP_ID = req.body.VP_ID;
  var DA_XU_LY_VP = req.body.VP_ID;
  viphamCtr.updateXuLy(VP_ID, DA_XU_LY_VP, function(err, data) {
    res.json(data);
  });
};
