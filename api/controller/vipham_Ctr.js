"use strict";
const vipham_M = require("../Model/vipham_Model");
const muontra_M = require("../Model/muontra_Model");
const loi_M = require("../Model/loi_Model");
const taikhoan_M = require("../Model/taikhoan_Model");

exports.allViPham = cb => {
  vipham_M.findAll().then(vipham => {
    cb(null, vipham);
    console.log("All vipham:", JSON.stringify(vipham, null, 4));
  });
};

// //vi pham - tai khoan
// exports.vipham_taikhoan = function(TK_ID, XE_ID, cb) {
//   muontra_M
//     .findAll({
//       include: [
//         {
//           model: taikhoan_M,
//           where: {
//             TK_ID: TK_ID
//           }
//         }
//       ],
//       include: [
//         {
//           model: xe_M,
//           where: {
//             XE_ID: XE_ID
//           }
//         }
//       ],
//       include: [
//         {
//           model: muontra_M,
//           where: {
//             MUONTRA_ID: MUONTRA_ID
//           }
//         }
//       ]
//     })
//     .then(dsViPham => {
//       if (dsViPham) {
//         cb(null, dsViPham);
//       } else cb("Không có dữ liệu", null);
//       console.log("All vi pham theo id:", JSON.stringify(dsViPham, null, 4));
//     });
// };
