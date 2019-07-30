// const xe_M = require("../Model/xe_Model");
const vp_M = require("../Model/vipham_Model");
const mt_M = require("../Model/muontra_Model");
//------------------------
// select ID muon tra cua xe
exports.findMuontraID_Xe = (XE_ID, cb) => {
  mt_M
    .findOne({
      order: [["createdAt", "DESC"]],
      attributes: ["MUONTRA_ID"],
      where: {
        xeXEID: XE_ID
      }
    })
    .then(ID_MT => {
      if (ID_MT) {
        cb(null, ID_MT);
      } else cb("Không có dữ liệu", null);
      console.log("ID mượn trả:", JSON.stringify(ID_MT, null, 4));
    });
};

//select ID Loi = 1 cua MT_ID
exports.findIDLoi_MT = (MT_ID, cb) => {
  vp_M
    .findOne({
      where: {
        muontraMUONTRAID: MT_ID,
        loiLOIID: "1",
        VP_TRANGTHAI: "0"
      }
    })
    .then(ID_LOI => {
      if (ID_LOI) {
        cb(null, ID_LOI);
      } else cb("Không có dữ liệu", null);
      console.log("ID Lỗi:", JSON.stringify(ID_LOI, null, 4));
    });
};

//add vi pham LOI ID = 1
exports.addVP = (muontraMUONTRAID, cb) => {
  vp_M
    .create({
      loiLOIID: "1",
      muontraMUONTRAID: muontraMUONTRAID
    })
    .then(vp => {
      console.log("ID VP: " + vp.VP_ID);
      cb(null, vp);
    });
};

//is Inside
