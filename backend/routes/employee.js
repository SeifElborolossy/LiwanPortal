const express = require("express");
const employeeController = require('../controllers/employeeController');
const router = express.Router();



router.route('/')
    .get(employeeController.getAllEmployees)
    .post(employeeController.createEmployee);

router.route('/:id')
    .get(employeeController.getEmployee)
    .patch(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);


router
.route('/department/:department')
.get(employeeController.getEmployeesByDepartment);

router
.route('/:id/role')
.patch(employeeController.updateEmployeeRole);

module.exports = router