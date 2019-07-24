"use strict";
const sequelize = require("../../../Config/db");
const huhong_M = require("../../../Model/huhong_Model");

//lay danh sach hu hong
exports.allHuHong = cb => {
  huhong_M.findAll().then(huhong => {
    cb(null, huhong);
    console.log("Tất cả hư hỏng: ", JSON.stringify(huhong, null, 4));
  });
};
