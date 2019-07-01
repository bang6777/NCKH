const Sequelize = require('sequelize');
const db = require('./../Config/db');

const huhong_Model = db.define('huhong', {
    HH_ID: {
        type: Sequelize.STRING,
        allowNull: false
    },
    TK_ID: {
        type: Sequelize.STRING,
    },
    XE_ID: {
        type: Sequelize.STRING,
    },
    HH_MOTA: {
        type: Sequelize.STRING,
    },
    HH_TRANGTHAI: {
        type: Sequelize.STRING,
    },
});

db.sync();
module.exports = huhong_Model;