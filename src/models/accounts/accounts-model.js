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
