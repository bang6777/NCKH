const Sequelize = require("sequelize");
// CSDL OFFLINE
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

// //CSDL ONLINE
// var sequelize = new Sequelize(process.env.DATABASE_URL);
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch(err => {
//     console.error("Unable to connect to the database:", err);
//   });
// module.exports = sequelize;
