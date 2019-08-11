var muontraCtr = require("../controller/muontra_Ctr");

exports.viewMuonTra = function(req, res) {
  var TK_ID = req.params.TK_ID;
  muontraCtr.muontra_nguoidung(TK_ID, function(err, data) {
    res.json(data);
  });
};

exports.viewMuonTraXe = function(req, res) {
  var XE_ID = req.params.XE_ID;
  muontraCtr.muontra_Xe(XE_ID, function(err, data) {
    res.json(data);
    console.log(data);
  });
};

exports.thongkeMuontra = function(req, res) {
  var tungay = req.body.tungay;
  var denngay = req.body.denngay;
  console.log(tungay + "---" + denngay);
  muontraCtr.ThongKeMuonTra(tungay, denngay, function(err, data) {
    res.json(data);
    // console.log(data);
  });
};

exports.KetThucMuonTra = function(req, res) {
  var TK_ID = req.params.TK_ID;
  muontraCtr.findMuontraID_TK(TK_ID, function(err, mt_id) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      muontraCtr.updateTra_ThoiGian(mt_id.MUONTRA_ID, function(err, data) {
        res.json(data);
      });
    }
  });
};
