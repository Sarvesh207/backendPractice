const express = require("express");
const cookieParser = require("cookie-parser");
const protectedRoute = require("../Routers/authHelper");
const {
  getAllUser,
  updateUser,
  deleteUser,
  getUser,
} = require("../controller/userController");

const {
  signup,
  login,
  protectRoute,
  isAuthorised,
} = require("../controller/authController");

userRouter = express.Router();

// User's Option Update and Delete
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

// Sign up
userRouter.route("/signup").post(signup);

// Login
userRouter.route("/login").post(login);

//Profile Page
app.use(protectRoute);
userRouter.route("/userProfile").get(getUser);

// admin specific func
app.use(isAuthorised(["admin"]));
userRouter.route("").get(getAllUser);

module.exports = userRouter;
