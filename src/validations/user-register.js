const Joi = require("joi");

module.exports = (body, cb) => {
  const userRegisterationSchema = {
    email: Joi.string()
      .required()
      .email()
      .error(new Error("A valid email id must be provided")),
    firstName: Joi.string()
      .required()
      .alphanum()
      .min(3)
      .max(40)
      .error(
        new Error(
          "First name is required and must be chars of length 3 to 40. No spaces."
        )
      ),
    lastName: Joi.string()
      .required()
      .alphanum()
      .min(3)
      .max(40)
      .error(
        new Error(
          "Last name is required and must be chars of length 3 to 40. No spaces."
        )
      ),
    password: Joi.string()
      .required()
      .min(8)
      .max(100)
      .error(
        new Error(
          "Password is required and must be of length 8 to 100 characters"
        )
      )
  };
  return Joi.validate(body, userRegisterationSchema, cb);
};
