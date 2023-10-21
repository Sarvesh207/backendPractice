const express = require("express");

const app = express();
app.use(express.json());
//its middleware function its use in post request whatever data is comming convert in json

app.listen(5000, () => {
  console.log("Server is with method running on port 5000");
});

let users = [
  { id: 1, name: "Rahul", age: 20 },
  { id: 2, name: "Raj", age: 21 },
  { id: 3, name: "Rohit", age: 22 },
];

const userRouter = express.Router();
const authRouter = express.Router();



app.use("/user", userRouter);

app.use("/auth", authRouter);


userRouter
  .route("/")
  .get(getUser)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/:id").get(getUserById);

authRouter
.route('/signup')
.get(middlewere, getSignUp, middlewere2)
.post(postSignUp)



function getUser(req, res) {
  console.log(req.query);
  res.send(users);
}

function updateUser(req, res) {
  console.log(req.body);

  let dataToBeUpdated = req.body;

  //update data inusers object

  for (let key in req.body) {
    users[key] = dataToBeUpdated[key];
  }

  res.json({
    message: "data updated succesfully",
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

function deleteUser(req, res) {
  users = {};
  res.json({ message: "Data is deleted" });
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

function middlewere(req, res, next){
  console.log('middleware 1 encounred');
  next();
}

function middlewere2(req, res){
  console.log('middleware 2 encounred'); 
  console.log('middleware 2 ended res/req cycle'); 
  res.sendFile('/public/index.html', {root:__dirname})


  // next();
}

function getSignUp(req, res, next){
  console.log("signup called")
  next();
  // res.sendFile('/public/index.html', {root:__dirname})
}

function postSignUp(req, res){
  let obj = req.body;
  console.log('backend',obj);
  res.json({
    message:"user signed up",
    data:obj
  })

}