const Role = require("../models/roleModel");
const Employee = require("../models/employeeModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getAllRoles = catchAsync(async (req, res, next) => {
  const roles = await Role.findAll({
    attributes: ["id", "name", "permissions"],
    include: [
      {
        model: Employee,
        as: "users",
        attributes: ["id", "name", "email"], // Only include fields you need
      },
    ],
  });

  res.status(200).json({
    status: "success",
    results: roles.length,
    data: {
      roles,
    },
  });
});

exports.createRole = catchAsync(async (req, res, next) => {
  const { name, permissions } = req.body;

  const role = await Role.create({
    name,
    permissions,
  });

  res.status(201).json({
    status: "Success",
    data: { role },
  });
});

//Assiging roles to existing users
//Balez Admin only or ceo
exports.assignRole = catchAsync(async (req, res, next) => {
  const { employeeId, roleId } = req.body;

  const employee = await Employee.findByPk(employeeId);
  const role = await Role.findByPk(roleId);

  if (!employee || !role) {
    return next(new AppError("Person or Role not found", 404));
  }

  await employee.update({
    roleId: role.id,
    role: role.name,
  });

  res.status(200).json({
    status: "success",
    message: "Role assigned successfully",
    data: {
      person,
    },
  });
});

//Consider it like the protect method but it only checks the permission
exports.checkPermission = (requiredPermission) => {
  return catchAsync(async (req, res, next) => {
    const employee = await Employee.findByPk(req.user.id, {
      include: [
        {
          model: Role,
          as: "userRole",
        },
      ],
    });

    if (!employee || !employee.userRole) {
      return next(new AppError("Access denied", 401));
    }

    const hasPermission =
      employee.userRole.permissions.includes(requiredPermission);

    if (!hasPermission) {
      return next(new AppError("Access Denied!!", 403));
    }

    next();
  });
};
