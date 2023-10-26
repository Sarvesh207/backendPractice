const express = require('express');
const {protectRoute, isAuthorised} = require('../controller/authController');
const planRouter = express.Router();  



// all plans leke aayega 
planRouter
.route('/plans')
.get(getAllPlans)

// own plan -> logged in necessary
planRouter.use(protectRoute)
planRouter
.route('/plan/:id')
.get(getPlan)

// admin and restrauntowner can only create, update, and delete
planRouter.use(isAuthorised['admin', 'restrauntowner'])
planRouter
.route('crudPlan')
.post(createPlan)
.patch(updatePlan)
.delete(deletePlan)

// // Top 3 plans
// planRouter





