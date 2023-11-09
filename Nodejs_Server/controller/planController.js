const { forIn } = require("lodash");
const planModel = require("../models/planModel");
module.exports.getAllPlans = async function getAllPlans(req, res) {
  try {
    let plans = await planModel.find();
    if (plans) {
      return res.json({
        message: "all plans retrived",
        data: plans,
      });
    } else {
      return res.json({
        message: "plans not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.getPlan = async function getPlan(req, res) {
  try {
    let id = req.params.id;
    let plan = await planModel.findById(id);
    if (plan) {
      return res.json({
        message: "plan retrived",
        data: plan,
      });
    } else {
      return res.json({
        message: "plan not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.createPlan = async function createPlan(req, res) {
  try {
    let planData = req.body;
    let createdPlan = await planModel.create(planData);
    return res.json({
      message: "plan created successfully",
      data: createdPlan,
    });
  } catch (error) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.deletelan = async function deletePlan(req, res) {
  try {
    let id = req.params.body;
    let deletedPlan = await planModel.findByIdAndDelete(id);
    return res.json({
      message: "plan deleted successfully",
      data: deletedPlanPlan,
    });
  } catch (error) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.updatePlan = async function updatePlan(req, res) {
  try {
    let id = req.params.id;
    let dataToBeUpdated = req.body;
    let keys = [];

    for (let key in dataToBeUpdated) {
      keys.push(key);
    }

    let plan = await planModel.findById(id);
    for (let i = 0; i < keys.length; i++) {
      plan[keys[i]] = dataToBeUpdated[keys[i]];
    }
    await plan.save();
  } catch (error) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


// get top 3 plans

function top3Plans(plans) {
  try {
    plans.sort(function (a, b) {
      return b.rating - a.rating;
    });
    return plans.slice(0, 3);
  } catch (error) {
    return res.status(500).json({
        message: err.message
    })
  }
}