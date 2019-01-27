const { sequelizeConnection, Sequelize } = require("../../core/db");

const usersModel = sequelizeConnection.define("users", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
    // validate: {
    //   isEmail: {
    //     msg: "Must be a valid gmail id!"
    //   },
    //   notNull: true,
    //   notEmpty: true,
    //   len: [5, 100],
    //   isGmail(value) {
    //     if (value && value.length > 5) {
    //       return value.indexOf("gmail") > 2;
    //     }
    //   }
    // }
  },
  firstName: Sequelize.DataTypes.STRING,
  lastName: Sequelize.DataTypes.STRING,
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  isActive: {
    type: Sequelize.DataTypes.BOOLEAN
  }
});

module.exports = usersModel;
