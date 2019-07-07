// const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
// module.exports = new Sequelize('xedap', 'root', '', {
//   host: DATABASE_URL,
//   dialect: 'postgres',
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

if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null

  if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    console.log("Postgres:" + match[3] + match[4]);
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      port: match[4],
      host: match[3],
      logging: true //false
    })
  } else {
    // the application is executed on the local machine ... use mysql
    sequelize = new Sequelize('xedap', 'root', null)
  }

  // global.db = {
  //   Sequelize: Sequelize,
  //   sequelize: sequelize,
  //   User: sequelize.import(__dirname + '/user')
  //   // add your other models here
  // }

  /*
    Associations can be defined here. E.g. like this:
    global.db.User.hasMany(global.db.SomethingElse)
  */
}

module.exports = sequelize;
