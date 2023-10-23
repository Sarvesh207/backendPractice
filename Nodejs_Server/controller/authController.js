const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const JWT_KEY = require("../scretes");

// Sign up user
module.exports.signup = async function signUp(req, res) {
    try {
            let dataObj = req.body;
            let user = await userModel.create(dataObj);
            if(user){
                return res,json({
                    message: "user signed up",
                    data: user,
                })
            }
            else {
                res.json({
                    message:"error while signing up"
                })
            }
            // console.log("backend", user);
            res.json({
            message: "user signed up",
            data: user,
            });
    } catch (error) {
            res.status(500).json({
            message: error.message,
            });
    }
}

// Login user

module.exports.login = async function loginUser(req, res) {
    try {
      let data = req.body;
      if (data.email) {
        let user = await userModel.findOne({ email: data.email });
  
        if (user) {
          //bcyrpt => compare
          if (user.password == data.password) {
         
            let uniqueId  = user['_id'] // unique id
            let token = jwt.sign({payload:uniqueId}, JWT_KEY)
               res.cookie("login", token, {httpOnly:true})
  
  
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

// isAuthorised -> to Check if user's role is user is admin, restrauntowner , deliveryBoy

module.exports.isAuthorised = function isAuthorised(roles){
    return function(req, res, next){
        if(roles.includes(req.role){
            next();
        } else{
            res.status(401).json({
                message:"Operation not allowed"
            })
        }
    }
}

// protectRoute

module.exports.protectRoute = async function protectedRoute(req, res, next){
    let token;
    if(req.cookies.login){
      console.log(req.cookies);
      token = req.cookies.login;    
      let payload = jwt.verify(token,JWT_KEY );
      
      if(payload){
      const user = await userModel.findById(payload.payload)
      req.role = user.role;
      req.id = user.id;
      next();
      } else {
        return res.json({
            message:"user is not verified"
        })
      }
     
    } else {
      return res.json({
        message: "user is not loggedIn operation is not allowed "
      })
    }
  }