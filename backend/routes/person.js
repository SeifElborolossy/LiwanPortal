const express = require("express");
const personController = require('../controllers/personController');
const router = express.Router();



router.route('/').get(personController.getAllPersons)

router.route('/:id')
    .get(personController.getPerson)
    .patch(personController.updatePerson)
    .delete(personController.deletePerson);


router
.route('/department/:department')
.get(personController.getPersonsByDepartment);

router
.route('/:id/role')
.patch(personController.updatePersonRole);

module.exports = router