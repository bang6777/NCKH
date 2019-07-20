"use strict";
const sequelize = require("./../Config/db");
const khuonvien_M = require("../Model/khuonvien_Model");

// exports.allUser = (query,cb) =>{
//     var statement = "select * from taikhoan";
//     sequelize.query(statement).then((data) => {
//         cb.end(JSON.stringify(data));
//         });
//     };

// exports.allKhuonVien = cb => {
//   var statement = "select * from taikhoan";
//   taikhoan_M.findAll().then(taikhoan => {
//     cb(null, taikhoan);
//     console.log("All users:", JSON.stringify(taikhoan, null, 4));
//   });
// };