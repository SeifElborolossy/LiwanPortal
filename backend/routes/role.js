const express = require("express");
const roleController = require('../controllers/roleController');
const router = express.Router();


router
  .route("/")
  .get(roleController.getAll)
//  .post(companyController.createCompany);



module.exports = router