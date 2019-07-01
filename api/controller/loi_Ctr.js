'use strict'
const loi_M = require('./../Model/loi_Model');
exports.allLoi = (cb) => {
    loi_M.findAll().then(loi => {
        cb(null, loi);
        console.log("All lỗi:", JSON.stringify(loi, null, 4));
    });
};