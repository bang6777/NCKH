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
    XE_ID: 1,
    XE_IMEI: "867959033016407",
    XE_NAMSANXUAT: "2019",
    XE_GHICHU: "XE_GHICHU",
    XE_LAT: "10.0305035",
    XE_LNG: "105.766663",
    XE_TRANGTHAI: 1
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
    XE_LNG: "105.766663",
    XE_TRANGTHAI: 1
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
    LOI_ID: 1,
    LOI_TEN: "Vượt khỏi khuôn viên",
    LOI_MOTA: "Ghi nhận vi phạm vào HTQL và có biện pháp xử lý"
  });
  loi_m.create({
    LOI_ID: 2,
    LOI_TEN: "Mượn quá thời gian cho phép",
    LOI_MOTA: "Gửi cảnh báo đến người dùng"
  });
  //   ------------------------Tài khoản ------------------
  TK_m.create({
    TK_ID: "admin",
    TK_PASSWORD: "$2a$10$I3Z8uaCxjyDExJWKmqVu..MpuQJuFMZFbR2HHBpWCN2Tw6g3CVVgO",
    TK_HOTEN: "Admin",
    TK_QUYEN: "Quản trị",
    TK_DONVI: "CNTT & TT",
    TK_LOAI: "Giảng viên",
    TK_HIEULUC: 1
  });
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
    TK_HIEULUC: 0
  });
  TK_m.create({
    TK_ID: "B1606935",
    TK_PASSWORD: "$2a$10$I3Z8uaCxjyDExJWKmqVu..MpuQJuFMZFbR2HHBpWCN2Tw6g3CVVgO",
    TK_HOTEN: "Thụy Thảo",
    TK_QUYEN: "Quản trị",
    TK_DONVI: "Công nghệ",
    TK_LOAI: "Sinh viên",
    TK_HIEULUC: 1
  });
  //   ------------------------Mượn trả ------------------
  MT_m.create({
    taikhoanTKID: "B1501088",
    xeXEID: 1,
    TRA_THOIGIAN: new Date(2019, 9, 15),
    MUON_VITRI_LAT: 10.03099,
    MUON_VITRI_LNG: 105.769765,
    TRA_VITRI_LAT: 10.029088,
    TRA_VITRI_LNG: 105.769765
  });
  MT_m.create({
    taikhoanTKID: "B1501088",
    xeXEID: 3,
    MUON_VITRI_LAT: 10.03099,
    MUON_VITRI_LNG: 105.769765
  });
  MT_m.create({
    taikhoanTKID: "B1401088",
    xeXEID: 1,
    TRA_THOIGIAN: new Date(2019, 9, 15),
    MUON_VITRI_LAT: 10.03099,
    MUON_VITRI_LNG: 105.769765,
    TRA_VITRI_LAT: 10.029088,
    TRA_VITRI_LNG: 105.769765
  });
  MT_m.create({
    taikhoanTKID: "B1401088",
    xeXEID: 2,
    MUON_VITRI_LAT: 10.03099,
    MUON_VITRI_LNG: 105.769765,
    TRA_VITRI_LAT: 10.029088,
    TRA_VITRI_LNG: 105.769765,
    TRA_THOIGIAN: new Date(2019, 9, 15)
  });
  MT_m.create({
    taikhoanTKID: "B1606935",
    xeXEID: 1,
    MUON_VITRI_LAT: 10.03099,
    MUON_VITRI_LNG: 105.769765
  });
  //   ------------------------ Vi Phạm ------------------
  VP_m.create({
    muontraMUONTRAID: 1,
    loiLOIID: 1,
    VP_TRANGTHAI: 1,
    VP_LAT: 10.029088,
    VP_LNG: 105.769765
  });
  VP_m.create({
    muontraMUONTRAID: 2,
    loiLOIID: 2,
    VP_LAT: 10.029088,
    VP_LNG: 105.769765
  });
  VP_m.create({
    muontraMUONTRAID: 3,
    loiLOIID: 2,
    VP_LAT: 10.029088,
    VP_LNG: 105.769765
  });
  VP_m.create({
    muontraMUONTRAID: 4,
    loiLOIID: 1,
    VP_TRANGTHAI: 1,
    VP_LAT: 10.029088,
    VP_LNG: 105.769765
  });
  //   ------------------------ Hu Hỏng ------------------
  HH_m.create({
    taikhoanTKID: "B1401088",
    xeXEID: 1,
    HH_MOTA: "Xe bị bể bánh",
    HH_TRANGTHAI: 0
  });
  HH_m.create({
    taikhoanTKID: "B1401088",
    xeXEID: 1,
    HH_MOTA: "Đứt dây sên",
    HH_TRANGTHAI: 1
  });
  HH_m.create({
    taikhoanTKID: "B1401088",
    xeXEID: 1,
    HH_MOTA: "Kẹt thắng",
    HH_TRANGTHAI: 2
  });
  HH_m.create({
    taikhoanTKID: "B1606935",
    xeXEID: 1,
    HH_MOTA: "Ổ khóa bị hư",
    HH_TRANGTHAI: 0
  });
};
