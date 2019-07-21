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
