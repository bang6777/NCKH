'use strict'
const huhong_M = require('../Model/huhong_Model');

exports.allUser = (cb) => {
    huhong_M.findAll().then(huhong => {
        cb(null, huhong);
        console.log("All hu hong:", JSON.stringify(huhong, null, 4));
    });
};