const Sequelize = require("sequelize");
const db = require("../Config/db");
const muontra = require("./muontra_Model");

const xe_Model = db.define("xe", {
<<<<<<< HEAD
	// attributes
	XE_ID: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	XE_IMEI: {
		type: Sequelize.STRING,
		primaryKey: true,
		allowNull: false
	},
	XE_TRANGTHAI: {
		type: Sequelize.INTEGER,
		defaultValue: 0 // 0. Sẵn sàng sử dụng, 1. Đang được sử dụng, 2. Đang sửa chữa
	},
	XE_LAT: {
		type: Sequelize.DOUBLE,
		defaultValue: 0.0
	},
	XE_LNG: {
		type: Sequelize.DOUBLE,
		defaultValue: 0.0
	},
	XE_NAMSANXUAT: {
		type: Sequelize.STRING
	},
	XE_GHICHU: {
		type: Sequelize.STRING
	}
=======
  // attributes
  XE_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  XE_IMEI: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  XE_TRANGTHAI: {
    type: Sequelize.INTEGER,
    defaultValue: 0 // 0. Sẵn sàng sử dụng, 1. Đang được sử dụng, 2. Đang sửa chữa
  },
  XE_LAT: {
    type: Sequelize.DOUBLE,
    defaultValue: 0.0
  },
  XE_LNG: {
    type: Sequelize.DOUBLE,
    defaultValue: 0.0
  },
  XE_NAMSANXUAT: {
    type: Sequelize.STRING
  },
  XE_GHICHU: {
    type: Sequelize.STRING
  }
>>>>>>> 09a36ccec3a21aea6c545bf08f48c8af22362f96
});

db.sync();
module.exports = xe_Model;
