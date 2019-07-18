"use strict";
const huhong_M = require("../Model/huhong_Model");
const taikhoan_M = require("../Model/taikhoan_Model");

exports.allHuHong = cb => {
  huhong_M.findAll().then(huhong => {
    cb(null, huhong);
    console.log("Tất cả hư hỏng: ", JSON.stringify(huhong, null, 4));
  });
};

//Hu hong theo TK
exports.huhong_taikhoan = function(TK_ID, cb) {
  huhong_M
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
    .then(dsHuHong => {
      if (dsHuHong) {
        cb(null, dsHuHong);
      } else cb("Không có dữ liệu", null);
      console.log("All hu hong theo id:", JSON.stringify(dsHuHong, null, 4));
    });
};
