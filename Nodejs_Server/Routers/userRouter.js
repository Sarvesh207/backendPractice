const express = require("express");
const userModel = require("../models/userModel");
const cookieParser = require("cookie-parser");  

const userRouter = express.Router();


userRouter
  .route("/")
  .get(getUsers)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/getCookies").get(getCookies);
userRouter.route("/setCookies").get(setCookies);

userRouter.route("/:id").get(getUserById);

async function getUsers(req, res) {
  // console.log(req.query);
  let allUsers = await userModel.find();
  let user = await userModel.find({ name: "Sarvesh" });

  res.json({
    message: "list of all users",
    data: allUsers,
  });
}

async function updateUser(req, res) {
  console.log(req.body);

  let dataToBeUpdated = req.body;
  let user = await userModel.findOneAndUpdate(
    { email: "sarvesh@gmail.com" },
    dataToBeUpdated
  );
  //update data inusers object

  // for (let key in req.body) {
  //   users[key] = dataToBeUpdated[key];
  // }

  res.json({
    message: "data updated succesfully",
    data: user,
  });
}

function postUser(req, res) {
  console.log(req.body);
  users = req.body;
  console.log(users);
  res.json({
    message: "data recived succesfully",
    user: req.body,
  });
}

async function deleteUser(req, res) {
  // users = {};
  let dataToBeDeleted = req.body;
  let user = await userModel.findOneAndDelete(dataToBeDeleted);
  res.json({ message: "Data is deleted", data: user });
}

function getUserById(req, res) {
  console.log(req.params.id);
  let paramId = req.params.id;
  let obj = {};
  for (let i = 0; i < users.length; i++) {
    if (users[i]["id"] == paramId) {
      obj = users[i];
    }
  }
  res.json({
    message: "data recived succesfully",
    data: obj,
  });
}

function setCookies(req, res) {
  // res.setHeader("Set-Cookie", "isLoggedIn = true");
  res.cookie("isLoggedIn", true, {
    maxAge: 360000,
    secure: true,
    httpOnly: true,
  });
  res.cookie("isPrimeMember", true);
  res.send("cookies has been set");
}

function getCookies(req, res) {
  let cookies = req.cookies;
  console.log(cookies);
  res.send("cookies has been set");
}

module.exports = userRouter;
