"use strict";
const xe_M = require("../Model/xe_Model");

exports.allXe = cb => {
  xe_M.findAll().then(xe => {
    cb(null, xe);
    console.log("Tất cả xe: ", JSON.stringify(xe, null, 4));
  });
};

exports.addXe = (XE_IMEI, XE_NAMSANXUAT, XE_GHICHU, XE_TRANGTHAI, XE_VITRI, cb) => {
  xe_M
    .create({
      XE_IMEI: XE_IMEI,
      XE_NAMSANXUAT: XE_NAMSANXUAT,
      XE_GHICHU: XE_GHICHU,
      XE_TRANGTHAI: XE_TRANGTHAI,
      XE_VITRI: XE_VITRI
    })
    .then(xe => {
      console.log("ID của xe: " + xe.XE_ID);
      cb(null, xe);
    });
};

exports.deleteXe = (XE_ID, cb) => {
  xe_M
    .destroy({
      where: {
        XE_ID: XE_ID
      }
    })
    .then(xe => {
      console.log("Đã xóa xe: ", xe.XE_ID);
      cb(null, xe);
    })
    .catch(err => {
      cb(err, null);
    });
};
exports.updateXe = (XE_ID, XE_IMEI, XE_LAT, XE_LNG, cb) => {
  xe_M
    .update(
      {
        XE_LAT: XE_LAT,
        XE_LNG: XE_LNG
      },
      {
        where: {
          XE_ID: XE_ID,
          XE_IMEI: XE_IMEI
        }
      }
    )
    .then(xe => {
      if(xe){
        console.log("Đã cập nhật vị trí xe: ", xe.XE_ID);
        cb(null, "OK");
      }else cb("ERR", null);
      
    }).catch(err=>{
      cb(err, null);
    });
};
//cap nhat thong tin
exports.updateXeAllInf = (XE_ID, XE_IMEI, XE_NAMSANXUAT, XE_GHICHU, cb) => {
  xe_M
    .update(
      {
        XE_IMEI: XE_IMEI,
        XE_NAMSANXUAT: XE_NAMSANXUAT,
        XE_GHICHU: XE_GHICHU
      },
      {
        where: {
          XE_ID: XE_ID
        }
      }
    )
    .then(xe => {
      console.log("Đã cập nhật xe: ", xe.XE_ID);
      cb(null, xe);
    });
};

//cap nhat trang thai
exports.updateTrangThai = (XE_ID, XE_IMEI, XE_TRANGTHAI, cb) => {
  xe_M
    .update(
      {
        XE_TRANGTHAI: XE_TRANGTHAI
      },
      {
        where: {
          XE_ID: XE_ID,
          XE_IMEI: XE_IMEI
        }
      }
    )
    .then(xe => {
      if(xe){
        console.log("Đã cập nhật trạng thái xe: ", xe);
        
        cb(null, "OK");
      }else cb("Thông tin về xe không hợp lệ ", null);
    }).catch(err=>{
      cb(err, null);
    });
};

//cap nhat trang thai-huhong
exports.updateTrangThaiXe = (XE_ID, XE_TRANGTHAI, cb) => {
  xe_M
    .update(
      {
        XE_TRANGTHAI: XE_TRANGTHAI
      },
      {
        where: {
          XE_ID: XE_ID
        }
      }
    )
    .then(xe => {
      console.log("Đã cập nhật xe: ", xe.XE_ID);
      cb(null, xe);
    });
};

//tim xe theo id
exports.findXeByID = (XE_ID, cb) => {
  xe_M
    .findAll({
      where: {
        XE_ID: XE_ID
      }
    })
    .then(xe => {
      console.log("xe: "+ JSON.stringify(xe));
      cb(null, xe);
    });
};

exports.findXeByID_IMEI = (XE_ID,XE_IMEI, cb) => {
  xe_M
    .findAll({
      where: {
        XE_ID: XE_ID,
        XE_IMEI: XE_IMEI
      }
    })
    .then(xe => {
      console.log("xe: ", xe.XE_ID);
      cb(null, xe);
      cb("Yêu cầu không hợp lệ !",null);
    }).catch(err=>{
      cb(err,null);
    });
};

//tim xe theo id find one
exports.findByID = (XE_ID, cb) => {
  xe_M
    .findOne({
      where: {
        XE_ID: XE_ID
      }
    })
    .then(xe => {
      console.log("xe: ", xe.XE_ID);
      cb(null, xe);
    });
};
