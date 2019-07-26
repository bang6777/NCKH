const Sequelize = require('sequelize');
const db = require('../Config/db');
const muontra = require('./muontra_Model');

const xe_Model = db.define("xe", {
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
});

db.sync();
module.exports = xe_Model;
