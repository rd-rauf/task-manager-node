const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const usersModel = require("../../models/accounts/accounts-model");

class AccountService {
  constructor() {}

  signIn(email, password) {
    return usersModel
      .findOne({
        where: {
          email: {
            [Op.eq]: email
          }
        },
        attributes: ["email", "firstName", "lastName", "password"],
        raw: true
      })
      .then(userInfo => {
        if (userInfo) {
          return bcrypt.compare(password, userInfo.password).then(isValid => {
            if (isValid) {
              return { ...userInfo, isValid: true };
            } else {
              return null;
            }
          });
        } else {
          return null;
        }
      });
  }

  signUp(userDetails) {
    const { email, firstName, lastName, password } = userDetails;
    return bcrypt.hash(password, 10).then(bcryptedPassword => {
      return usersModel.create(
        {
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: bcryptedPassword
        },
        { raw: true }
      );
    });
  }

  getUsers() {
    return usersModel.findAll({
      raw: true,
      attributes: ["id", "email", "firstName", "lastName", "isActive"]
    });
  }
}

module.exports = AccountService;
