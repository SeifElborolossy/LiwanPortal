const Employee = require("./employeeModel");
const Role = require("./roleModel");
const Order = require("./orderModel");
const Company = require("./companyModel");
const EmployeeOrder = require("./employeeOrderModel");

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

  // Define the many-to-many relationship
  Employee.belongsToMany(Order, {
    through: EmployeeOrder,
    foreignKey: "employee_id",
    otherKey: "order_id",
    as: "pendingOrders", // You can choose a different alias if you prefer
  });
  Order.belongsToMany(Employee, {
    through: EmployeeOrder,
    foreignKey: "order_id",
    otherKey: "employee_id",
    as: "notifiedEmployees", // You can choose a different alias if you prefer
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
  EmployeeOrder,
};
