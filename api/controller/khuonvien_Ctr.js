const sequelize = require("./../Config/db");
const khuonvien_M = require("../Model/khuonvien_Model");

exports.allToaDo = cb => {
  khuonvien_M
    .findAll({
      where: {
        KV_TRANGTHAI: "1"
      }
    })
    .then(kv => {
      cb(null, kv);
      console.log("All toa do:", JSON.stringify(kv, null, 4));
    });
};

exports.addKV = (KV_LAT, KV_LNG, KV_TRANGTHAI, cb) => {
  khuonvien_M
    .create({
      KV_LAT: KV_LAT,
      KV_LNG: KV_LNG,
      KV_TRANGTHAI: KV_TRANGTHAI
    })
    .then(kv => {
      console.log("Khuon vien da add:");
      cb(null, kv);
    });
};

//cap nhat trang thai 0
exports.updateKV_TrangThai = (KV_TRANGTHAI, cb) => {
  khuonvien_M
    .update(
      {
        KV_TRANGTHAI: "0"
      },
      {
        where: {
          KV_TRANGTHAI: "1"
        }
      }
    )
    .then(kv => {
      console.log("Đã cập nhật trạng thái: ");
      cb(null, kv);
    });
};
