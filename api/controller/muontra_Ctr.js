"use strict";
const Sequelize = require("sequelize");
const muontra_M = require("../Model/muontra_Model");
const taikhoan_M = require("../Model/taikhoan_Model");
const xe_M = require("../Model/xe_Model");

// taikhoan_M.hasMany(muontra_M, { foreignKey: 'TK_ID' });
// muontra_M.belongsTo(taikhoan_M, { foreignKey: 'TK_ID' });

//muon tra - tai khoan
exports.muontra_nguoidung = function(TK_ID, cb) {
  muontra_M
    .findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: taikhoan_M,
          where: {
            TK_ID: TK_ID
          }
        }
      ]
    })
    .then(dsMuonTra => {
      if (dsMuonTra) {
        cb(null, dsMuonTra);
      } else cb("Không có dữ liệu", null);
      console.log("All muon tra theo id:", JSON.stringify(dsMuonTra, null, 4));
    });
};
exports.muontra_Xe = function(XE_ID, cb) {
  muontra_M
    .findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: xe_M,
          where: {
            XE_ID: XE_ID
          }
        }
      ]
    })
    .then(dsMuonTra => {
      if (dsMuonTra) {
        cb(null, dsMuonTra);
      } else cb("Không có dữ liệu", null);
      console.log("All muon tra xe theo id:", JSON.stringify(dsMuonTra, null, 4));
    });
};

//get All muon tra
exports.allMuonTra = cb => {
  muontra_M
    .findAll({
      order: [["createdAt", "DESC"]]
    })
    .then(muontra => {
      cb(null, muontra);
      console.log("All mượn trả:", JSON.stringify(muontra, null, 4));
    });
};

//get chua tra xe
exports.getChuaTra = cb => {
  const Op = Sequelize.Op;
  muontra_M
    .findAll({
      order: [["createdAt", "DESC"]],
      where: {
        [Op.or]: [
          {
            TRA_THOIGIAN: null
          },
          {
            TRA_VITRI_LAT: null
          },
          {
            TRA_VITRI_LNG: null
          }
        ]
      }
    })

    .then(mt => {
      console.log("muon tra: ", mt.MUONTRA_ID);
      cb(null, mt);
    });
};

exports.findMuonTraByID = (MUONTRA_ID, cb) => {
  muontra_M
    .findAll({
      where: {
        MUONTRA_ID: MUONTRA_ID
      }
    })
    .then(mt => {
      console.log("muon tra: ", mt.MUONTRA_ID);
      cb(null, mt);
    });
};
