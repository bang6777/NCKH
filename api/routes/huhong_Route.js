var huhongCtr = require("../controller/huhong_Ctr");

exports.viewHuHong = function(req, res) {
  var TK_ID = req.params.TK_ID;
  huhongCtr.huhong_taikhoan(TK_ID, function(err, data) {
    res.json(data);
  });
};

exports.viewHuHongXe = function(req, res) {
  var XE_ID = req.params.XE_ID;
  huhongCtr.huhong_xe(XE_ID, function(err, data) {
    res.json(data);
  });
};
