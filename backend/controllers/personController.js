const Person = require('../models/personModel')
const Role = require('../models/roleModel')
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')


exports.getAllPersons = catchAsync(async (req, res, next) => {
    const persons = await Person.findAll({
      include: [{
        model: Role,
        as: 'userRole',
        attributes: ['name', 'permissions']
      }]
    });
  
    res.status(200).json({
      status: 'success',
      results: persons.length,
      data: {
        persons,
      },
    });
  });
  
  exports.getPerson = catchAsync(async (req, res, next) => {
    const person = await Person.findByPk(req.params.id, {
      include: [{
        model: Role,
        as: 'userRole',
        attributes: ['name', 'permissions']
      }]
    });
  
    if (!person) {
      return next(new AppError('No person found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        person,
      },
    });
  });
  
  exports.updatePerson = catchAsync(async (req, res, next) => {
    if (req.body.role || req.body.roleId) {
      return next(new AppError('Role updates not allowed', 400));//Use another endpoint
    }
  
    const person = await Person.findByPk(req.params.id);
  
    if (!person) {
      return next(new AppError('No person found with that ID', 404));
    }
  
    await person.update(req.body);
  
  
    res.status(200).json({
      status: 'success',
      data: {
        person,
      },
    });
  });
  

  exports.deletePerson = catchAsync(async (req, res, next) => {
    const person = await Person.findByPk(req.params.id);
  
    if (!person) {
      return next(new AppError('No person found with that ID', 404));
    }
  
    await person.destroy();
  
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
  
  // Get persons by department
  exports.getPersonsByDepartment = catchAsync(async (req, res, next) => {
    const { department } = req.params;
  
    const persons = await Person.findAll({
      where: { department },
      include: [{
        model: Role,
        as: 'userRole',
        attributes: ['name', 'permissions']
      }]
    });
  
    res.status(200).json({
      status: 'success',
      results: persons.length,
      data: {
        persons,
      },
    });
  });
  
  //Admin only
  exports.updatePersonRole = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { role, roleId } = req.body;
  
    // Verify role exists
    const newRole = await Role.findByPk(roleId);
    if (!newRole) {
      return next(new AppError('Role not found', 404));
    }
  
    // Update person
    const person = await Person.findByPk(id);
    if (!person) {
      return next(new AppError('Person not found', 404));
    }
  
    await person.update({
      role: role,
      roleId: roleId
    });
  
    res.status(200).json({
      status: 'success',
      data: {
        person,
      },
    });
  });