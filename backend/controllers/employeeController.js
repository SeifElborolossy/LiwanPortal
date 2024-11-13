const { Employee, Role } = require("../models/assosciations");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const encryptPassword = require("../utils/helpers");

exports.getAllEmployees = catchAsync(async (req, res, next) => {
  const employees = await Employee.findAll({
    include: [
      {
        model: Role,
        as: "userRole",
        attributes: ["name", "permissions"],
      },
    ],
  });

  res.status(200).json({
    status: "success",
    results: employees.length,
    data: { employees },
  });
});

exports.createEmployee = catchAsync(async (req, res, next) => {
  try {

    req.body.password = encryptPassword(req.body.password);

    // Create the new employee
    const employee = await Employee.create(req.body);

    res.status(201).json({
      status: "success",
      data: { employee },
    });
  } catch (error) {
    // Catch any other unexpected errors
    return res.status(500).json({
      status: "error",
      message: error.message || "An unexpected error occurred",
    });
  }
})

exports.getEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.findByPk(req.params.id, {
    include: [
      {
        model: Role,
        as: "userRole",
        attributes: ["name", "permissions"],
      },
    ],
  });

  if (!employee) {
    return next(new AppError("No Employee found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { employee },
  });
});

exports.updateEmployee = catchAsync(async (req, res, next) => {
  if (req.body.role || req.body.roleId) {
    return next(new AppError("Role updates not allowed", 400));
  }

  const employee = await Employee.findByPk(req.params.id);

  if (!employee) {
    return next(new AppError("No Employee found with that ID", 404));
  }

  await employee.update(req.body);

  res.status(200).json({
    status: "success",
    data: { employee },
  });
});

exports.deleteEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.findByPk(req.params.id);

  if (!employee) {
    return next(new AppError("No Employee found with that ID", 404));
  }

  await employee.destroy();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getEmployeesByDepartment = catchAsync(async (req, res, next) => {
  const { department } = req.params;

  const employees = await Employee.findAll({
    where: { department },
    include: [
      {
        model: Role,
        as: "userRole",
        attributes: ["name", "permissions"],
      },
    ],
  });

  res.status(200).json({
    status: "success",
    results: employees.length,
    data: { employees },
  });
});

exports.updateEmployeeRole = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { role, roleId } = req.body;

  // Verify role exists
  const newRole = await Role.findByPk(roleId);
  if (!newRole) {
    return next(new AppError("Role not found", 404));
  }

  // Update Employee
  const employee = await Employee.findByPk(id);
  if (!employee) {
    return next(new AppError("Employee not found", 404));
  }

  await employee.update({
    role,
    roleId,
  });

  res.status(200).json({
    status: "success",
    data: { employee },
  });
});
