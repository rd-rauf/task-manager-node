const expressJwt = require("express-jwt");

module.exports = app => {
  app.use(
    expressJwt({ secret: process.env.JWTSECRETKEY }).unless({
      path: ["/api/users/signin", "/api/users/signup"]
    })
  );
};
