const jwt = require("jsonwebtoken");

const AccountService = require("../../services/accounts/accounts-service");
const responseFormat = require("../../core/response-format");
const validateSignupUser = require("../../validations/user-register");

class AccountController {
  constructor() {
    this.accountService = new AccountService();
  }

  signIn(req, res, next) {
    let { email, password, response } = req.body;

    this.accountService
      .signIn(email, password)
      .then(userInfo => {
        if (userInfo) {
          let token = null;
          let payload = {
            email: userInfo.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName
          };
          token = jwt.sign({ data: payload }, process.env.JWTSECRETKEY, { expiresIn: "1d" });
          payload.userAuthToken = token;
          res.status(200).json(responseFormat.wrap(null, 200, "success", "Login successful", payload));
        } else {
          res.status(200).json(responseFormat.wrap(null, 200, "failure", "Invalid user/ password", null));
        }
      })
      .catch(error => {
        next(error);
      });
  }

  signUp(req, res, next) {
    validateSignupUser(req.body, (validationFails, body) => {
      if (!validationFails) {
        this.accountService
          .signUp(req.body)
          .then(userInfo => {
            if (userInfo) {
              const payload = {
                id: userInfo.id,
                email: userInfo.email,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName
              };
              res.status(200).json(responseFormat.wrap(null, 200, "success", "User registered successfully", payload));
            }
          })
          .catch(error => {
            next(error);
          });
      } else {
        next({
          message: validationFails.message
        });
      }
    });
  }

  getUsers(req, res, next) {
    return this.accountService.getUsers().then(users => {
      res.status(200).json(responseFormat.wrap(null, 200, "success", "Users list", users));
    });
  }
}
module.exports = AccountController;
