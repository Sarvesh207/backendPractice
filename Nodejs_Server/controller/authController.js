const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../scretes");

// Sign up user
module.exports.signup = async function signUp(req, res) {
  try {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    if (user) {
      return res.json({
        message: "user signed up",
        data: user,
      });
    } else {
      res.json({
        message: "error while signing up",
      });
    }
    // console.log("backend", user);
    // res.json({
    //   message: "user signed up",
    //   data: user,
    // });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Login user

module.exports.login = async function loginUser(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });

      if (user) {
        //bcyrpt => compare
        if (user.password == data.password) {
          let uniqueId = user["_id"]; // unique id
          let token = jwt.sign({ payload: uniqueId }, JWT_KEY);
          res.cookie("login", token, { httpOnly: true });

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
};

// isAuthorised -> to Check if user's role is user is admin, restrauntowner , deliveryBoy

module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
    if (roles.includes(req.role)) {
      next();
    } else {
      res.status(401).json({
        message: "Operation not allowed",
      });
    }
  };
};

// protectRoute

module.exports.protectRoute = async function protectedRoute(req, res, next) {
  try {
    let token;
    if (req.cookies.login) {
      console.log(req.cookies);
      token = req.cookies.login;
      let payload = jwt.verify(token, JWT_KEY);

      if (payload) {
        console.log("payload token", payload);
        const user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        console.log(req.id, req.role);
        next();
      } else {
        return res.json({
          message: "user is not verified",
        });
      }
    } else {
      ///browser
      const client = req.get("User-Agent");
      if(client.includes("Mozilla") == true){
        return res.redirect('/login');
      }
      // postman
      return res.json({
        message: "Plese login",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Note: schema -> model -> documents  in mongoDB
// forgetPassword
module.exports.forgetpassword = async function forgetpassword(req, res) {
  let { email } = req.body;
  try {
    if (user) {
      const user = await userModel.findOne({ email });
      // create reset token used to create new token
      const resetToken = createResetToken();
      let resetPasswordLink = `${req.protocol}://${req.get(
        host
      )}/resetpassword/${resetToken}`;
      // send email to user
      // nodemailer
    } else {
      res.json({
        message: "please login",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// reset password

module.exports.resetpassword = async function resetpassword(req, res) {
  try {
    const token = req.params.token;
    let { password, confirmPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      // resetpasswordHandler will update user's password  in db
      user.resetPasswordHandler(password, confirmPassword);
      await user.save();
      res.json({
        message: "password change successfully, login again",
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (error) {
    res,
      json({
        message: error.message,
      });
  }
};

// logout password

module.exports.logout = function logout(req, res) {
  res.cookie("login", "", { maxAge: 1 });
  res.json({
    message: "user logged out successfully",
  });
};
