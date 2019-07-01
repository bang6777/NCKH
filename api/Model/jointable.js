const Sequelize = require('sequelize');
const sequelize = require('./../Config/db');
const join={};
join.Sequelize = Sequelize;
join.sequelize = sequelize;

// Model table
join.taikhoan = require('./taikhoan_Model')(sequelize,Sequelize);
join.huhong   = require('./huhong_Model')(sequelize,Sequelize);
join.loi      = require('./loi_Model')(sequelize,Sequelize);
join.muontra  = require('./muontra_Model')(sequelize,Sequelize);
join.vipham   = require('./vipham_Model')(sequelize,Sequelize);
join.xe       = require('./xe_Model')(sequelize,Sequelize);
const taikhoan_M = require('../Model/taikhoan_Model')(sequelize,Sequelize);
const xe_M = require('../Model/xe_Model')(sequelize,Sequelize);

taikhoan_M.belongsTo