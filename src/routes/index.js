const accountsRoutes = require("./accounts/accounts-routes");

const prefix = "/api";

module.exports = app => {
  app.use(prefix, accountsRoutes);
};
