-------------------------- Danh muc----------------------------
---------Tai khoan
--Load
    SELECT * FROM TAIKHOAN ;
--Add
    INSERT INTO TAIKHOAN (TK_ID, TK_PASSWORD, TK_HOTEN, TK_QUYEN) VALUES 
--Update
    UPDATE TAIKHOAN SET (TK_PASSWORD = , TK_HOTEN = , TK_QUYEN = ) WHERE TK_ID =
--Delete
    DELETE FROM TAIKHOAN WHERE TK_ID = 

---------Xe dap
--Load
    SELECT * FROM XEDAP ;
--Add
    INSERT INTO XEDAP (XE_ID, XE_NAMSANXUAT, XE_GHICHU) VALUES 
--Update
    UPDATE XEDAP SET (XE_NAMSANXUAT = ,  XE_GHICHU = ) WHERE XE_ID =
--Delete
    DELETE FROM XEDAP WHERE XE_ID = 

---------Loi
--Load
    SELECT * FROM LOI ;
--Add
    INSERT INTO LOI (LOI_ID, LOI_TEN, LOI_MOTA) VALUES 
--Update
    UPDATE LOI SET (LOI_TEN = ,  LOI_MOTA = ) WHERE LOI_ID =
--Delete
    DELETE FROM XEDAP WHERE LOI_ID = 

-------------------------- Quan ly ----------------------------
---------Muon tra
--Load
    SELECT * FROM MUONTRA
--Add muon
    INSERT INTO MUONTRA (TK_ID, XE_ID, MUON_THOIGIAN, MUON_VITRI) VALUES 
--Update tra
    UPDATE MUONTRA SET (TRA_THOIGIAN = , TRA_VITRI = )

---------Vi pham
--Load
    SELECT * FROM VIPHAM
--Add vi pham
    INSERT INTO VIPHAM (MUONTRA_ID, LOI_ID, VP_THOIGIAN) VALUES

---------Hu hong
--Load
    SELECT * FROM HUHONG
--Add hu hong
    INSERT INTO HUHONG (TK_ID, XE_ID, HH_MOTA, HH_TRANGTHAI) VALUES
-- Update trang thai hu hong
    UPDATE HUHONG SET (HH_TRANGTHAI = )