"use strict";
const xe_M = require("../Model/xe_Model");

exports.allXe = cb => {
  xe_M.findAll().then(xe => {
    cb(null, xe);
    console.log("Tất cả xe: ", JSON.stringify(xe, null, 4));
  });
};

exports.addXe = (XE_ID, XE_NAMSANXUAT, XE_GHICHU, XE_TRANGTHAI, XE_VITRI, cb) => {
  xe_M
    .create({
      XE_ID: XE_ID,
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
exports.updateXe = (XE_ID, XE_VITRI, cb) => {
  xe_M
    .update(
      {
        XE_VITRI: XE_VITRI
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

exports.updateXeAllInf = (XE_ID, XE_NAMSANXUAT, XE_GHICHU, cb) => {
  xe_M
    .update(
      {
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
exports.updateTrangThai = (XE_ID, XE_TRANGTHAI, cb) => {
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
      console.log("Đã cập nhật trạng thái xe: ", xe.XE_ID);
      cb(null, xe);
    });
};

// //tim xe theo id
// exports.findXeByID = (XE_ID, cb) => {
//   xe_M
//     .findAll({
//       where: {
//         XE_ID: XE_ID
//       }
//     })
//     .then(xe => {
//       console.log("tài khoản: ", xe.XE_ID);
//       cb(null, xe);
//     });
// };

//tim xe theo id
exports.findXeByID = (XE_ID, cb) => {
  xe_M
    .findAll({
      where: {
        XE_ID: XE_ID
      }
    })
    .then(xe => {
      console.log("xe: ", xe.XE_ID);
      cb(null, xe);
    });
};
