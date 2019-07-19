const Sequelize = require("sequelize");
// module.exports = new Sequelize(process.env.DATABASE_URL);

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
<<<<<<< HEAD
// module.exports = new Sequelize("xedap", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
//   pool: {
//     max: 10,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
//   define: {
//     freezeTableName: true
//   }
// });
var sequelize = new Sequelize(process.env.DATABASE_URL);
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
module.exports = sequelize;
=======
module.exports = new Sequelize("xedap", "root", "", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    freezeTableName: true
  }
});
>>>>>>> 1a70d26f3e3876b96d03939e0645e47e50cf17c0
