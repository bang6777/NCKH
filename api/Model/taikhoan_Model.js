const Sequelize = require('sequelize');
const db = require('./../Config/db');

const taikhoan_Model = db.define('taikhoan', {
    // attributes
    TK_ID: {
      type: Sequelize.STRING,
      allowNull: false
    },
    TK_PASSWORD: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    TK_HOTEN: {
        type: Sequelize.STRING,
      }, 
    TK_QUYEN: {
        type: Sequelize.STRING,
      }
  }
  );

  db.sync();
  // find all users
  
  // Find all users
  // taikhoan_Model.findAll().then(taikhoan => {
  //   console.log("All users:", JSON.stringify(taikhoan, null, 4));
  // });
  
  // Create a new user
  // taikhoan_Model.create({ 
  //   TK_ID: "B1606777", 
  //   TK_PASSWORD: "12345",
  //   TK_HOTEN:"Nguyen Anh Bang",
  //   TK_QUYEN:"1"
  // }).then(jane => {
  //   console.log("Jane's auto-generated ID:", jane.id);
  // });
  
  // // Delete everyone named "Jane"
  // taikhoan_Model.destroy({
  //   where: {
  //     firstName: "Jane"
  //   }
  // }).then(() => {
  //   console.log("Done");
  // });
  
  // // Change everyone without a last name to "Doe"
  // taikhoan_Model.update({ lastName: "Doe" }, {
  //   where: {
  //     lastName: null
  //   }
  // }).then(() => {
  //   console.log("Done");
  // });
module.exports=taikhoan_Model;