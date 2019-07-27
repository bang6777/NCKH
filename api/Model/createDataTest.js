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
    TK_QUYEN: "Quản trị",
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
    TRA_THOIGIAN: new Date(2019, 9, 20),
    MUON_VITRI_LAT: 10.030990184893133,
    MUON_VITRI_LNG: 105.76976502229843,
    TRA_VITRI_LAT: 10.029088509604737,
    TRA_VITRI_LNG: 105.76976502229843
  });
  MT_m.create({
    taikhoanTKID: "B1501088",
    xeXEID: 2
  });
  MT_m.create({
    taikhoanTKID: "B1401088",
    xeXEID: 1,
    TRA_THOIGIAN: new Date(2019, 9, 20),
    MUON_VITRI_LAT: 10.030990184893133,
    MUON_VITRI_LNG: 105.76976502229843,
    TRA_VITRI_LAT: 10.029088509604737,
    TRA_VITRI_LNG: 105.76976502229843
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
    muontraMUONTRAID: 1,
    loiLOIID: 1,
    DA_XU_LY_VP: true,
    VP_LAT: 10.029088509604737,
    VP_LNG: 105.76976502229843
  });
  VP_m.create({
    muontraMUONTRAID: 2,
    loiLOIID: 2
  });
  VP_m.create({
    muontraMUONTRAID: 3,
    loiLOIID: 2
  });
  VP_m.create({
    muontraMUONTRAID: 4,
    loiLOIID: 1,
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
    xeXEID: 2,
    HH_MOTA: true,
    HH_TRANGTHAI: 1
  });
  HH_m.create({
    taikhoanTKID: "B1401088",
    xeXEID: 3,
    HH_MOTA: true,
    HH_TRANGTHAI: 2
  });
};
