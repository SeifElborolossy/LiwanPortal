const Employee = require("./employeeModel");
const Role = require("./roleModel");
const Order = require("./orderModel");
const Company = require("./companyModel");

const setupAssociations = () => {
  // Role and Employee: One-to-Many
  Role.hasMany(Employee, {
    foreignKey: "role_id",
    as: "employees",
  });
  Employee.belongsTo(Role, {
    foreignKey: "role_id",
    as: "employeeRole",
  });

  // Employee and Order: One-to-Many
  Employee.hasMany(Order, {
    foreignKey: "employee_id",
    as: "employeeOrders",
  });
  Order.belongsTo(Employee, {
    foreignKey: "employee_id",
    as: "employee",
  });

  // Company and Order: One-to-Many
  Company.hasMany(Order, {
    foreignKey: "company_id",
    as: "companyOrders",
  });
  Order.belongsTo(Company, {
    foreignKey: "company_id",
    as: "company",
  });
};

// Set up the associations
setupAssociations();

module.exports = {
  Employee,
  Role,
  Order,
  Company,
};
