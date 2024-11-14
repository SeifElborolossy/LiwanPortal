const express = require("express");
const companyController = require("../controllers/companyController");
const router = express.Router();

// router.route("/:id").get(companyController.getCompanyById);

router
  .route("/")
  .get(companyController.getallCompanies)
  .post(companyController.createCompany);


router
  .route("/:id")
  .get(companyController.getCompanyById)
  .patch(companyController.updateCompany)
  .delete(companyController.deleteCompany);

  
module.exports = router;
