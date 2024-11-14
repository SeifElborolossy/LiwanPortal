const Sequelize = require("sequelize");
const db = require("../config/db");

const EmployeeOrder = db.define(
  "employeeOrder",
  {},
  {
    timestamps: false,
    tableName: "employee_orders",
  }
);

module.exports = EmployeeOrder;
