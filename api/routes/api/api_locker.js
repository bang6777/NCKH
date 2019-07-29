"use strict";
var express = require("express");
var router = express.Router();

var taikhoan_ctr = require("./controllers/taikhoan-ctr");
var xe = require("../../controller/xe_Ctr");
var muontra = require("../../controller/muontra_Ctr");



//Trả xe
router.post("/locker/:XE_ID/traxe", function (req, res) {
    var XE_ID = req.params.XE_ID;
    var XE_IMEI = req.body.XE_IMEI;
    var LAT = req.body.LAT;
    var LNG = req.body.LNG;

    if (XE_ID && XE_IMEI && LAT && LNG) {
        //Cập nhật trạng thái xe
        xe.updateTrangThai(XE_ID, XE_IMEI, 0, function (err, result) {
            if (err) res.status(400).send(err);
            else {
                muontra.traXe(XE_ID, LAT, LNG, function (err, result) {
                    if (err) {
                        xe.updateTrangThai(XE_ID, XE_IMEI, 1, function (err, result) { });
                        res.status(400).send(err);
                    } else {
                        res.status(200).send(result);
                    }
                })
            }
        })
    } else res.status(400).send("Yêu cầu không hợp lệ");

});

//
router.get("/locker/:XE_ID", function (req, res) {
    var XE_ID = req.params.XE_ID;
    var XE_IMEI = req.query.XE_IMEI;

    if (XE_ID && XE_IMEI) {

        xe.findXeByID_IMEI(XE_ID, XE_IMEI, function (err, result) {
            if (err) {
                res.status(400).send("ERR");
            } else {

                res.send(result.XE_TRANGTHAI);

            }
        });
    } else res.status(400).send("Yêu cầu không hợp lệ");

});

// Cập nhật vị trí
router.put("/locker/:XE_ID", function (req, res) {
    var XE_ID = req.params.XE_ID;
    var XE_IMEI = req.body.XE_IMEI;
    var LAT = req.body.LAT;
    var LNG = req.body.LNG;

    if (XE_ID && XE_IMEI && LAT && LNG) {

        xe.updateXe(XE_ID, XE_IMEI, LAT, LNG, function (err, data) {
            if (err) {
                res.status(400).send("ERR");
            } else {

                res.send("OK");

            }
        });
    } else res.status(400).send("Yêu cầu không hợp lệ");

});


module.exports = router;