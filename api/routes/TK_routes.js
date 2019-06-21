'use strict';
module.exports = function(app) {
  let productsCtrl = require('./../controller/taikhoan');

  // todoList Routes
  app.route('/taikhoan')
    .get(productsCtrl.get)
    .post(productsCtrl.store);
  
  // app.route('/taikhoanInsert')
  // .post(productsCtrl.store);

  app.route('/taikhoan/:TK_ID')
    .get(productsCtrl.detail)
    .put(productsCtrl.update)
    .delete(productsCtrl.delete);

  // app.post('/taikhoan',(req,res)=>{
  //   let data = req.body;
  //       let sql = 'INSERT INTO taikhoan (TK_ID,TK_PASSWORD,TK_HOTEN,TK_QUYEN) VALUES (2,1234,hao,1)'
  //       db.query(sql, [data], (err, response) => {
  //           if (err) throw err
  //           res.json({message: 'Insert success!'})
  //       });
  // })
};