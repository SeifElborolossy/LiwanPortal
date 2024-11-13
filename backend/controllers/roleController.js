const Role = require('../models/roleModel')
const Person = require('../models/personModel')
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')


exports.getAll = catchAsync(async (req, res, next) => {
    const { roleId } = req.params;
  
    const role = await Role.findByPk(roleId);
  
    if (!role) {
      return next(new AppError('Role not found', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        permissions: role.permissions
      }
    });
  });
  
  exports.createRole = catchAsync(async (req, res ,next)=>{
    const {name , permissions} = req.body

    const role = await Role.create({
        name,
        permissions
    })

    res.status(201).json({
        status: 'Success',
        data:{ role }
    })
})


//Assiging roles to existing users
//Balez Admin only or ceo
exports.assignRole = catchAsync(async (req, res, next) => {
    const { personId, roleId } = req.body;
  
    const person = await Person.findByPk(personId);
    const role = await Role.findByPk(roleId);
  
    if (!person || !role) {
      return next(new AppError('Person or Role not found', 404));
    }
  
    await person.update({ 
      roleId: role.id,
      role: role.name 
    });
  
    res.status(200).json({
      status: 'success',
      message: 'Role assigned successfully',
      data: {
        person
      }
    });
  });

  

  //Consider it like the protect method but it only checks the permission
  exports.checkPermission = (requiredPermission) => {
    return catchAsync(async (req, res, next) => {
      const person = await Person.findByPk(req.user.id, {
        include: [{
          model: Role,
          as: 'userRole'
        }]
      });
  
      if (!person || !person.userRole) {
        return next(new AppError('Access denied', 401));
      }
  
      const hasPermission = person.userRole.permissions.includes(requiredPermission);
  
      if (!hasPermission) {
        return next(new AppError('Access Denied!!', 403));
      }
  
      next();
    });
}
