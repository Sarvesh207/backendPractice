const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
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

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
