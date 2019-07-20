const Sequelize = require('sequelize');
const db = require('../Config/db');
const muontra = require('./muontra_Model');

const xe_Model = db.define("xe", {
	// attributes
	XE_ID: {
		type: Sequelize.STRING,
		primaryKey: true,
		allowNull: false
	},
	XE_TRANGTHAI: {
		type: Sequelize.STRING
		// allowNull defaults to true
	},
	XE_VITRI: {
		type: Sequelize.STRING
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
