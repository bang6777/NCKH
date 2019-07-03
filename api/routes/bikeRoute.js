'use strict';
var express = require('express');
var router = express.Router();
var taikhoan = require('../controller/taikhoan_Ctrl');
var xe = require('../controller/xe_Ctr');
var loi = require('../controller/loi_Ctr');
var huhong = require('../controller/huhong_Ctr');
var muontra = require('../controller/muontra_Ctr');
var vipham = require('../controller/vipham_Ctr');
var muontraRoute = require("./muontra_Route");

//Login
router.get('/login', function (req, res) {
    res.render('./../api/views/login');
});

// Trang chủ
router.get('/', function (req, res) {
    res.render('./../api/views/index');
}
);
//----Danh mục
//------------- Tài Khoản
router.get('/taikhoan', function (req, res) {

    taikhoan.allUser(function (err, data) {
        res.render('./../api/views/taikhoan', { taikhoan: data });
    });
}
);
router.post('/taikhoan', function (req, res) {

    var TK_ID = req.body.TK_ID;
    var TK_PASSWORD = req.body.TK_PASSWORD;
    var TK_HOTEN = req.body.TK_HOTEN;
    var TK_QUYEN = req.body.TK_QUYEN;
    var TK_DONVI = req.body.TK_DONVI;
    var TK_LOAI = req.body.TK_LOAI;
    var TK_HIEULUC = req.body.TK_HIEULUC;

    if (TK_ID == null) {
        res.status(404).json({ message: "TK_ID null" });
    }
    if (TK_PASSWORD == null) {
        res.status(404).json({ message: "TK_Pwd null" });
    }
    if (TK_HOTEN == null) {
        res.status(404).json({ message: "TK_HOTEN null" });
    }
    if (TK_QUYEN == null) {
        res.status(404).json({ message: "TK_QUYEN null" });
    }
    if (TK_DONVI == null) {
        res.status(404).json({ message: "TK_DONVI null" });
    }
    if (TK_LOAI == null) {
        res.status(404).json({ message: "TK_LOAI null" });
    }
    taikhoan.addUser(TK_ID, TK_PASSWORD, TK_HOTEN, TK_QUYEN, TK_DONVI, TK_LOAI, 1, function (err, data) {
        if (err) {
            res.status(404).json({ message: "ERR!" });
        } else {
            res.status(200).json({ message: "đã thêm thành công!" });
        }

    });

});
router.post('/taikhoan/delete/:TK_ID', function (req, res) {
    var TK_ID = req.body.TK_ID;
    taikhoan.deleteUser(TK_ID, function (err, data) {
        if (err) {
            res.status(404).json({ message: "ERR" });
        } else
            res.status(200).json({ message: "đã xóa thành công tài khoản ID: " + TK_ID });
    });
});
router.post('/taikhoan/update/:TK_ID', function (req, res) {
    var TK_ID = req.body.TK_ID;
    var TK_HOTEN = req.body.TK_HOTEN;
    var TK_DONVI = req.body.TK_DONVI;
    var TK_LOAI = req.body.TK_LOAI;
    var TK_QUYEN = req.body.TK_QUYEN;
    taikhoan.updateUser(TK_ID, TK_HOTEN, TK_DONVI, TK_LOAI, TK_QUYEN, function (err, data) {
        if (err) {
            res.status(404).json({ message: "ERR" });
        } else
            res.status(200).json({ message: "đã cập nhật thành công tài khoản ID: " + TK_ID });
    });
});
//-------------Xe
router.get('/xe', function (req, res) {

    xe.allXe(function (err, data) {
        res.render('./../api/views/xe', { xe: data });
    });
}
);

router.post('/xe', function (req, res) {
    var XE_ID = req.body.XE_ID;
    var XE_NAMSANXUAT = req.body.XE_NAMSANXUAT;
    var XE_GHICHU = req.body.XE_GHICHU;

    if (XE_ID == null) {
        res.status(404).json({ message: "XE_ID null" });
    }

    xe.addXe(XE_ID, XE_NAMSANXUAT, XE_GHICHU, function (err, data) {
        if (err) {
            res.status(404).json({ message: "XE_ID null" });
        }
        else {
            res.status(200).json({ message: "Đã thêm thành công!" })
        }
    });
});

router.post('/xe/delete/:TK_ID', function (req, res) {
    var XE_ID = req.body.XE_ID;
    xe.deleteXe(XE_ID, function (err, data) {
        if (err) {
            res.status(404).json({ message: "ERR" });
        } else
            res.status(200).json({ message: "đã xóa thành công xe ID: " + XE_ID });
    });
});

//-------------Lỗi
router.get('/loi', function (req, res) {
    res.render('./../api/views/loi')
})

//Cập nhật khuôn viên
router.get('/khuonvien', function (req, res) {
    res.render('./../api/views/khuonvien')
})

//----Quản lý
//-----------Mượn trả
router.get('/muontra', function (req, res) {
    res.render('./../api/views/muontra')
})
// Muon tra theo ID
router.get('/muontra/:TK_ID', muontraRoute.viewMuonTra);
//-----------Vi phạm
router.get('/vipham', function (req, res) {
    res.render('./../api/views/vipham')
})
//-----------Hư hỏng
router.get('/huhong', function (req, res) {
    res.render('./../api/views/huhong')
})



module.exports = router;


// module.exports = function(app) {
//   let productsCtrl = require('../controller/taikhoan_Ctrl');
//   var task = require('./../controller/taikhoan_Ctrl');
//   // todoList Routes
//   // app.route('/taikhoan')
//     // .get(productsCtrl.get)
//     // .post(productsCtrl.store);

//   // app.route('/taikhoanInsert')
//   // .post(productsCtrl.store);

//   // app.route('/taikhoan/:TK_ID')
//     // .get(productsCtrl.detail)
//     // .put(productsCtrl.update)
//     // .delete(productsCtrl.delete);
//   app.get('/taikhoan',task.allUser);
// };