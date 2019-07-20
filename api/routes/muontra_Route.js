var muontraCtr = require("../controller/muontra_Ctr");

exports.viewMuonTra = function(req, res) {
  var TK_ID = req.params.TK_ID;
  muontraCtr.muontra_nguoidung(TK_ID, function(err, data) {
    res.json(data);
  });
};

exports.viewMuonTraXe = function(req, res) {
  var XE_ID = req.params.XE_ID;
  muontraCtr.muontra_xe(XE_ID, function(err, data) {
    res.json(data);
    console.log(data);
  });
};
