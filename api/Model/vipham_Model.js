const Sequelize = require('sequelize');
const db = require('../Config/db');

const vipham_Model = db.define('vipham',{
    VP_ID:{
        type: Sequelize.STRING,
    },
    MUONTRA_ID:{
        type: Sequelize.STRING,
    },
    LOI_ID:{
        type: Sequelize.STRING,
    },
    VP_THOIGIAN:{
        type: Sequelize.STRING,
    },
});

db.sync();
module.exports = vipham_Model;