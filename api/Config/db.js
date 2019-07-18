const Sequelize = require("sequelize");

// // Option 1: Passing parameters separately : CSDL ONLINE
// module.exports = new Sequelize("sql12297830", "sql12297830", "UI2y5fJwMQ", {
//   host: "sql12.freemysqlhosting.net",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
//   define: {
//     freezeTableName: true
//   }
// });

// Option 2: Passing parameters separately : CSDL OFFLINE
// module.exports = new Sequelize("xedap", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
//   define: {
//     freezeTableName: true
//   }
// });

var sequelize = new Sequelize(process.env.DATABASE_URL, {
  define: {
    freezeTableName: true
  }
});

module.exports = sequelize;
