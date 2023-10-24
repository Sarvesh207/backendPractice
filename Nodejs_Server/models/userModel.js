const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto"); 
const db_link =
  "mongodb+srv://sarveshgaynar:FLdU4Lik8rKF3bUw@cluster0.aqh1jp6.mongodb.net/";

mongoose
  .connect(db_link)
  .then(function (db) {
    // console.log(db);

    console.log("db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate:function () {
      return emailValidator.validate(this.email); 
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 8,
    validate:function (){
      return this.password == this.confirmPassword  
    }
  },
  role:{
    type:String,
    enum:["admin", "user", "restaurantowner","deliveryboy" ],
    default:"user",
  },
   profileImage:{
    type:String, 
    default:"img/users/default.jpeg"
  },
  resetToken:String
});


//before event occure in db
// userSchema.pre("save", function(){
//   console.log("before saving in db")
// })

// userSchema.post("save", function(){
//   console.log("after saving in db")
// })

userSchema.pre("save", function () {
  this.confirmPassword = undefined;
})

// userSchema.pre("save", async function () {
//     let salt = await bcrypt.genSalt();
//     let hashedString =await bcrypt.hash(this.password, salt); 
//     this.password = hashedString;
   
// })
//model
userSchema.methods.createResetToken = function(){
  // creating unique token using npm i crypto
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken = resetToken;
  return resetToken;
}

userSchema.methods.resetPasswordHandler = function (password, comfirmPassword){
  this.password = password;
  this.confirmPassword = comfirmPassword;
  this.resetToken = undefined;
}

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
