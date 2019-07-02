// // const taikhoan_M = require('../Model/taikhoan_Model');
// // const muontra_M = require('../Model/muontra_Model');
// // const db = require('./../Config/db');


// // taikhoan_M.hasMany(muontra_Model,{foreignKey: 'TK_ID'});
// // muontra_M.belongsTo(taikhoan_Model,{foreignKey:'TK_ID'});


// // db.sync();
// // // module.exports = join;

// const models = {
//     ...require('./taikhoan_Model'),
//     ...require('./muontra_Model'),
// };

// Object.keys(models).forEach(key => {
//     if (models[key] && models[key].associate) {
//         models[key].associate(models);
//     }
// });

// module.exports = models;