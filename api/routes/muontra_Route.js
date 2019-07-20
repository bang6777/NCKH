var muontraCtr = require("../controller/muontra_Ctr");

<<<<<<< HEAD
exports.viewMuonTra = function (req, res) {
    var TK_ID = req.params.TK_ID;
    muontraCtr.muontra_nguoidung(TK_ID, function (err, data) {
        res.json(data);
    });
};
exports.viewMuonTraXe = function (req, res) {
    var XE_ID = req.params.XE_ID;
    muontraCtr.muontra_Xe(XE_ID, function (err, data) {
        res.json(data);
    });
};
=======
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
>>>>>>> 5a23f574603a892b81e129e5e4540eeabe087067
