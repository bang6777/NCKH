'use strict';
var express = require('express');
var router = express.Router();
var taikhoan = require('./../controller/taikhoan_Ctrl');



// router.get('/taikhoan',taikhoan.allUser);

router.get('/taikhoan',function(req,res){
    
    taikhoan.allUser(function(err, data){
        res.render('./../api/views/taikhoan',{taikhoan:data});
    });
        
}
);


router.post('/taikhoan',function(req,res){

    var TK_ID = req.body.TK_ID;
    var TK_PASSWORD = req.body.TK_PASSWORD;
    var TK_HOTEN = req.body.TK_HOTEN;
    var TK_QUYEN = req.body.TK_QUYEN;
    if(TK_ID == null){
        res.status(404).json({message: "TK_ID null"});
    }
    if(TK_PASSWORD == null){
        res.status(404).json({message: "TK_Pwd null"});
    }
    if(TK_HOTEN == null){
        res.status(404).json({message: "TK_HOTEN null"});
    }
    if(TK_QUYEN == null){
        res.status(404).json({message: "TK_QUYEN null"});
    }


    taikhoan.addUser(TK_ID,TK_PASSWORD,TK_HOTEN,TK_QUYEN,function(err, data){
        if(err){
            res.status(404).json({message: "ERR"});
        }else
        res.status(200).json({message:"đã thêm thành công"});
    });
    
});


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