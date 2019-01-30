const Sequelize = require("sequelize");

const sequelizeConnection = new Sequelize(process.env.DB_DBNAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  dialect: "mysql",
  host: "localhost",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    freezeTableName: true,
    timestamps: false
  },
  logging: false
  // logging: (message, options) => {
  //   if (process.env.NODE_ENV == "development") {
  //     console.log(message);
  //     console.log(options);
  //   }
  // }
});

module.exports = {
  sequelizeConnection,
  Sequelize
};
