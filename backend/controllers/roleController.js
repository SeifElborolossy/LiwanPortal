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