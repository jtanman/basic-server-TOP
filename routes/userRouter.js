const { Router } = require("express");
const userController = require("../controllers/userController");

const userRouter = Router();

// GET /users - list all usernames
userRouter.get("/", userController.getUsernames);

// GET /users/new - show form to create a username
userRouter.get("/new", userController.createUsernameGet);

// POST /users/new - handle form submission
userRouter.post("/new", userController.createUsernamePost);

userRouter.get("/delete", userController.deleteUsernames);

module.exports = userRouter;