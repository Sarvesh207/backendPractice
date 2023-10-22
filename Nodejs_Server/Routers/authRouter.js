const express = require("express");
const userModel = require("../models/userModel");

const authRouter = express.Router();

authRouter
  .route("/signup")
  .get(middlewere, getSignUp, middlewere2)
  .post(postSignUp);

authRouter.route("/login").post(loginUser);

function middlewere(req, res, next) {
  console.log("middleware 1 encounred");
  next();
}

function middlewere2(req, res) {
  console.log("middleware 2 encounred");
  console.log("middleware 2 ended res/req cycle");
  res.sendFile("/public/index.html", { root: __dirname });

  // next();
}

function getSignUp(req, res, next) {
  console.log("signup called");

  next();
  // res.sendFile('/public/index.html', {root:__dirname})
}

async function postSignUp(req, res) {
  let dataObj = req.body;
  let user = await userModel.create(dataObj);
  console.log("backend", user);
  res.json({
    message: "user signed up",
    data: user,
  });
}

async function loginUser(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });

      if (user) {
        //bcyrpt => compare
        if (user.password == data.password) {
          return res.json({
            message: "login successfull",
            user: data,
          });
        } else {
          return res.json({
            message: "wrong credientials",
          });
        }
      } else {
        res.json({
          message: "user not Found",
        });
      }
    } else {
      res.json({
        message: " empty field found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = authRouter;
