"use strict";
// const Sequelize = require('sequelize');
const muontra_M = require("../Model/muontra_Model");
const taikhoan_M = require("../Model/taikhoan_Model");

// taikhoan_M.hasMany(muontra_M, { foreignKey: 'TK_ID' });
// muontra_M.belongsTo(taikhoan_M, { foreignKey: 'TK_ID' });

exports.muontra_nguoidung = function(TK_ID, cb) {
  muontra_M
    .findAll({
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
      console.log("All users:", JSON.stringify(taikhoan, null, 4));
    });
};

exports.allMuonTra = cb => {
  muontra_M.findAll().then(muontra => {
    cb(null, muontra);
    console.log("All lỗi:", JSON.stringify(muontra, null, 4));
  });
};
