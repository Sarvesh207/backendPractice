const userModel = require("../models/userModel");

module.exports.getUser = async function getUser(req, res) {
  try {
    let id = req.params.id;
    let users = await userModel.findById(id);
    if (users) {
      return res.json(users);
    } else {
      return res.json({
        message: "no users found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.updateUser = async function updateUser(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.findById(id);
    let dataToBeUpdated = req.body;
    if (user) {
      const keys = [];
      for (let key in dataToBeUpdated) {
        keys.push(key);
      }

      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataToBeUpdated[keys[i]];
      }
      user.confirmPassword = user.password;
      const updatedData = await user.save();

      res.json({
        message: "data updated succesfully",
        data: user,
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.deleteUser = async function deleteUser(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.findByIdAndDelete(id);
    if (!user) {
      res.json({
        message: "user not found",
      });
    } else {
      res.json({
        message: "user deleted succesfully",
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.getAllUser = async function getAllUser(req, res) {
  try {
    let users = await userModel.find();
    if (users) {
      res.json({
        message: "data recived succesfully",
        data: users,
      });
    } else {
      res.json({
        message: "no data found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
