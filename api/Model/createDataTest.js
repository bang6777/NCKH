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
        XE_IMEI: "352068063702873",
        XE_NAMSANXUAT: "2019",
        XE_GHICHU: "XE_GHICHU",
        XE_VITRI: "10.0305035,105.7674677"
    });
    xe_m.create({
        XE_ID: 2,
        XE_IMEI: "352068063702873",
        XE_NAMSANXUAT: "2019",
        XE_GHICHU: "XE_GHICHU",
        XE_VITRI: "10.0291089,105.7662124"
    });
    xe_m.create({
        XE_ID: 3,
        XE_IMEI: "352068063702873",
        XE_NAMSANXUAT: "2019",
        XE_GHICHU: "XE_GHICHU",
        XE_TRANGTHAI: 3,
        XE_VITRI: "10.0302499,105.766663"
    });
    xe_m.create({
        XE_ID: 4,
        XE_IMEI: "352068063702873",
        XE_NAMSANXUAT: "2019",
        XE_GHICHU: "XE_GHICHU",
        XE_TRANGTHAI: 2,
        XE_VITRI: "10.0311374,105.7699219"
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
        TK_ID: "B1601088",
        XE_ID: 1,
        TRA_THOIGIAN: new Date(2019, 9, 20),
    });
    MT_m.create({
        TK_ID: "B1501088",
        XE_ID: 1
    });
    MT_m.create({
        TK_ID: "B1401088",
        XE_ID: 1,
        TRA_THOIGIAN: new Date(2019, 9, 20),
    });
    MT_m.create({
        TK_ID: "B1401088",
        XE_ID: 2,
        TRA_THOIGIAN: new Date(2019, 9, 20),
    });
    MT_m.create({
        TK_ID: "B1401088",
        XE_ID: 1
    });

    //   ------------------------ Vi Phạm ------------------

    VP_m.create({
        MUONTRA_ID: 1,
        LOI_ID: 1,
        DA_XU_LY_VP: true,
    });
    VP_m.create({
        MUONTRA_ID: 2,
        LOI_ID: 2,
    });
    VP_m.create({
        MUONTRA_ID: 3,
        LOI_ID: 2,
    });
    VP_m.create({
        MUONTRA_ID: 4,
        LOI_ID: 1,
        DA_XU_LY_VP: true
    });

    //   ------------------------ Hu Hỏng ------------------
    HH_m.create({
        TK_ID: "B1401088",
        XE_ID: 1,
        HH_MOTA: true,
        HH_TRANGTHAI: "Đã báo"
    });
    HH_m.create({
        TK_ID: "B1401088",
        XE_ID: 1,
        HH_MOTA: true,
        HH_TRANGTHAI: "Đang sửa chửa"
    });
    HH_m.create({
        TK_ID: "B1401088",
        XE_ID: 1,
        HH_MOTA: true,
        HH_TRANGTHAI: "Đã sửa xong"
    });
    
   
}
