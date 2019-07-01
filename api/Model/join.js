const taikhoan_M = require('../Model/taikhoan_Model');
const muontra_M = require('../Model/muontra_Model');

taikhoan_M.belongsTo(muontra_M, {foreignKey: 'fk_muontra'});