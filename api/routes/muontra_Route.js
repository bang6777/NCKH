var muontraCtr = require('../controller/muontra_Ctr');

exports.viewMuonTra = function (req, res) {
    var TK_ID = req.params.TK_ID;
    muontraCtr.muontra_nguoidung(TK_ID, function (err, data) {
        res.json(data);
    });
}