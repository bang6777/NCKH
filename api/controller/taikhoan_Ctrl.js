'use strict'

// const util = require('util')
// const mysql = require('mysql')
const sequelize = require('./../Config/db')
// const Sequelize = require('sequelize');
// var async = require('async');
const taikhoan_M = require('../Model/taikhoan_Model');

// exports.allUser = (query,cb) =>{
//     var statement = "select * from taikhoan";
//     sequelize.query(statement).then((data) => {
//         cb.end(JSON.stringify(data));
//         });
//     };

exports.allUser = (cb) => {
    var statement = "select * from taikhoan";
    // sequelize.query(statement).then(arrTK => {
    //     cb(null, arrTK);
    //     // arrTK.forEach(tk => {
    //     //     cb.end(JSON.stringify(tk))
    //     // });
    // });


    taikhoan_M.findAll().then(taikhoan => {
        cb(null, taikhoan);
        console.log("All users:", JSON.stringify(taikhoan, null, 4));
    });


};

exports.addUser = (TK_ID, TK_PASSWORD, TK_HOTEN, TK_QUYEN, cb) => {
    
    taikhoan_M.create({
        TK_ID: TK_ID,
        TK_PASSWORD: TK_PASSWORD,
        TK_HOTEN: TK_HOTEN,
        TK_QUYEN: TK_QUYEN
    }).then(tk_bang => {
        console.log("Bang's auto-generated ID:", tk_bang.TK_ID);
        cb(null,tk_bang);
    });


};
