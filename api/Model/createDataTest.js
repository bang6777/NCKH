var HH_m = require("./huhong_Model");
var KH_m = require("./khuonvien_Model");
var loi_m = require("./loi_Model");
var MT_m = require("./muontra_Model");
var TK_m = require("./taikhoan_Model");
var VP_m = require("./vipham_Model");
var xe_m = require("./xe_Model");
exports.initDatabase = () => {
  // -------------------------------XE------------------
  xe_m.create({
    XE_IMEI: "352068063702873",
    XE_NAMSANXUAT: "2019",
    XE_GHICHU: "XE_GHICHU",
    XE_LAT: "10.0305035",
    XE_LNG: "105.766663"
  });
  xe_m.create({
    XE_IMEI: "352068063702873",
    XE_NAMSANXUAT: "2019",
    XE_GHICHU: "XE_GHICHU",
    XE_LAT: "10.0291089",
    XE_LNG: "105.766663"
  });
  xe_m.create({
    XE_IMEI: "352068063702873",
    XE_NAMSANXUAT: "2019",
    XE_GHICHU: "XE_GHICHU",
    XE_LAT: "10.0302499",
    XE_LNG: "105.766663"
  });
  xe_m.create({
    XE_IMEI: "352068063702873",
    XE_NAMSANXUAT: "2019",
    XE_GHICHU: "XE_GHICHU",
    XE_LAT: "10.0311374",
    XE_LNG: "105.766663"
  });
  //   -------------------LỖI-------------
  loi_m.create({
    LOI_TEN: "Vượt khỏi khuôn viên",
    LOI_MOTA: "Phạt 100.000 - 500.000VND khi vượt khỏi khuôn viên trường"
  });
  loi_m.create({
    LOI_TEN: "Đậu xe không đúng nơi qui định",
    LOI_MOTA: "Phạt 50.000 - 100.000VND khi vượt khỏi khuôn viên trường"
  });
  //   ------------------------Tài khoản ------------------
  TK_m.create({
    TK_ID: "B1401088",
    TK_PASSWORD: "$2a$10$I3Z8uaCxjyDExJWKmqVu..MpuQJuFMZFbR2HHBpWCN2Tw6g3CVVgO",
    TK_HOTEN: "Tâm Bùi",
    TK_QUYEN: "Người dùng",
    TK_DONVI: "Công nghệ",
    TK_LOAI: "Sinh viên",
    TK_HIEULUC: 1
  });
  TK_m.create({
    TK_ID: "B1501088",
    TK_PASSWORD: "$2a$10$I3Z8uaCxjyDExJWKmqVu..MpuQJuFMZFbR2HHBpWCN2Tw6g3CVVgO",
    TK_HOTEN: "Bằng Nguyễn",
    TK_QUYEN: "Người dùng",
    TK_DONVI: "Công nghệ",
    TK_LOAI: "Sinh viên",
    TK_HIEULUC: 1
  });
  TK_m.create({
    TK_ID: "B1601088",
    TK_PASSWORD: "$2a$10$I3Z8uaCxjyDExJWKmqVu..MpuQJuFMZFbR2HHBpWCN2Tw6g3CVVgO",
    TK_HOTEN: "Thụy Thảo",
    TK_QUYEN: "Người dùng",
    TK_DONVI: "Công nghệ",
    TK_LOAI: "Sinh viên",
    TK_HIEULUC: 0
  });
  //   ------------------------Mượn trả ------------------
  MT_m.create({
    taikhoanTKID: "B1601088",
    xeXEID: 1,
    TRA_THOIGIAN: new Date(2019, 9, 20)
  });
  MT_m.create({
    taikhoanTKID: "B1501088",
    xeXEID: 1
  });
  MT_m.create({
    taikhoanTKID: "B1401088",
    xeXEID: 1,
    TRA_THOIGIAN: new Date(2019, 9, 20)
  });
  MT_m.create({
    taikhoanTKID: "B1401088",
    xeXEID: 2,
    TRA_THOIGIAN: new Date(2019, 9, 20)
  });
  MT_m.create({
    taikhoanTKID: "B1401088",
    xeXEID: 1
  });
  //   ------------------------ Vi Phạm ------------------
  VP_m.create({
    MUONTRA_ID: 1,
    LOI_ID: 1,
    DA_XU_LY_VP: true
  });
  VP_m.create({
    MUONTRA_ID: 2,
    LOI_ID: 2
  });
  VP_m.create({
    MUONTRA_ID: 3,
    LOI_ID: 2
  });
  VP_m.create({
    MUONTRA_ID: 4,
    LOI_ID: 1,
    DA_XU_LY_VP: true
  });
  //   ------------------------ Hu Hỏng ------------------
  HH_m.create({
    taikhoanTKID: "B1401088",
    xeXEID: 1,
    HH_MOTA: true,
    HH_TRANGTHAI: 0
  });
  HH_m.create({
    taikhoanTKID: "B1401088",
    xeXEID: 1,
    HH_MOTA: true,
    HH_TRANGTHAI: 1
  });
  HH_m.create({
    taikhoanTKID: "B1401088",
    xeXEID: 1,
    HH_MOTA: true,
    HH_TRANGTHAI: 2
  });
};
