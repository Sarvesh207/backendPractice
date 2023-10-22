const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");  

app.use(express.json());

//its middleware function its use in post request whatever data is comming convert in json

app.listen(5000, () => {
  console.log("Server is with method running on port 5000");
});
app.use(cookieParser());


const userRouter = require("./Routers/userRouter")
const authRouter = require("./Routers/authRouter")

app.use("/user", userRouter);

app.use("/auth", authRouter);









