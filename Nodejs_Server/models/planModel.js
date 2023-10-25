//mongoose ke through connet mongodb
const mongoose = require("mongoose");
const db_link =
  "mongodb+srv://sarveshgaynar:FLdU4Lik8rKF3bUw@cluster0.aqh1jp6.mongodb.net/";

mongoose
  .connect(db_link)
  .then(function (db) {
    // console.log(db);

    console.log("Plan db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const planSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: [20, "plan name should not exceed more 20 characters  "],
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "price not entered"],
  },
  ratingAverage: {
    type: Number,
  },
  discount: {
    type: Number,
    validate: [
      function () {
        return this.discount < 100;
      },
      "discount should not exceed price",
    ],
  },
});



const planModel = mongoose.model("planModel", planSchema);

(async function createPlan() {
  let planObj = {
    name: "super food",
    duration: "30",
    price: 1000,
    ratinAverage: 5,
    disccount: 20,
  };

  // let data = await planModel.create(planObj);
  // console.log(data);

   const doc = new planModel(planObj);
   await doc.save();
})()
module.exports = planModel;
