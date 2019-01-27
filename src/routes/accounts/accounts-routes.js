let AccountController = require("../../controllers/accounts/accounts-controller");
const express = require("express");
const router = express.Router();

let accountController = new AccountController();

router.get("/users", accountController.getUsers.bind(accountController));
router.post("/users/signin", accountController.signIn.bind(accountController));
router.post("/users/signup", accountController.signUp.bind(accountController));

module.exports = router;
