'use strict';
module.exports = function(app) {
  let productsCtrl = require('./../controller/taikhoan');

  // todoList Routes
  app.route('/taikhoan')
    .get(productsCtrl.get)
    .post(productsCtrl.store);
}