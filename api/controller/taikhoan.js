'use strict'

// const util = require('util')
// const mysql = require('mysql')
// const db = require('./../Config/db')
    
const taikhoan_M = require('./../Model/xe');
module.exports = {
    get: (req, res) => {
        // let sql = 'SELECT * FROM taikhoan'
        // db.query(sql, (err, response) => {
        //     if (err) throw err
        //     res.json(response)
        // })//them phan trang vao
        db.findAll().then(xedap => {
            console.log("All users:", JSON.stringify(xedap, null, 4));
            res.json(xedap);
        });
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM taikhoan WHERE TK_ID = ?'
        db.query(sql, [req.params.TK_ID], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let TK_ID = req.params.TK_ID;
        let sql = 'UPDATE taikhoan SET ? WHERE id = ?'
        db.query(sql, [data, TK_ID], (err, response) => {
            if (err) throw err
            res.json({ message: 'Update success!' })
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO taikhoan (TK_ID,TK_PASSWORD,TK_HOTEN,TK_QUYEN) VALUES (4,1234,"Tam Bui",1)'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({ message: 'Insert success!' })
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM taikhoan WHERE TK_ID = 4'
        db.query(sql, [req.params.TK_ID], (err, response) => {
            if (err) throw err
            res.json({ message: 'Delete success!' })
        })
    }
}