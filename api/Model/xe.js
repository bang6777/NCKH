const Sequelize = require('sequelize');
const db = require('./../Config/db');

const xedap = sequelize.define('user', {
    // attributes
    XE_ID: {
      type: Sequelize.STRING,
      allowNull: false
    },
    XE_TRANGTHAI: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    XE_VITRI: {
        type: Sequelize.STRING,
      }, 
    XE_NAMSANXUAT: {
        type: Sequelize.STRING,
      },
      XE_GHICHU: {
        type: Sequelize.STRING,
      }
  }
  );
//   // Find all users
// db.findAll().then(users => {
//     console.log("All users:", JSON.stringify(users, null, 4));
//   });
  
//   // Create a new user
//   db.create({ firstName: "Jane", lastName: "Doe" }).then(jane => {
//     console.log("Jane's auto-generated ID:", jane.id);
//   });
  
//   // Delete everyone named "Jane"
//   db.destroy({
//     where: {
//       firstName: "Jane"
//     }
//   }).then(() => {
//     console.log("Done");
//   });
  
//   // Change everyone without a last name to "Doe"
//   db.update({ lastName: "Doe" }, {
//     where: {
//       lastName: null
//     }
//   }).then(() => {
//     console.log("Done");
//   });