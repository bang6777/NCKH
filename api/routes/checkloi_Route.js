var checkloiCtr = require("../controller/checkloi_Ctrl");

// select ID muon tra cua xe
exports.getIDMT = function(req, res) {
  var XE_ID = req.body.XE_ID;
  checkloiCtr.findMuontraID_Xe(XE_ID, function(err, data) {
    res.json(data);
  });
};

//select ID Loi = 1 cua MT_ID
exports.getIDLOI = function(req, res) {
  var MT_ID = req.body.MT_ID;
  checkloiCtr.findIDLoi_MT(MT_ID, function(err, data) {
    res.json(data);
  });
};
