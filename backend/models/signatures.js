const Sequelize = require("sequelize");
const db = require("../utils/database");

const Signature = db.define("signatures", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  employee_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "employee",
      key: "id",
    },
    validate: {
      notNull: { msg: "Employee ID cannot be null" },
      isInt: { msg: "Employee ID must be an integer" },
    },
  },
  company_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "company",
      key: "id",
    },
    validate: {
      notNull: { msg: "Company ID cannot be null" },
      isInt: { msg: "Company ID must be an integer" },
    },
  },
  order_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "order",
      key: "id",
    },
    validate: {
      notNull: { msg: "Order ID cannot be null" },
      isInt: { msg: "Order ID must be an integer" },
    },
  },
  signed_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    validate: {
      notNull: { msg: "Signed at date cannot be null" },
      isDate: { msg: "Signed at must be a valid date" },
    },
  },
  signature_data: {
    type: Sequelize.BLOB("long"),
    allowNull: false,
    validate: {
      notNull: { msg: "Signature data cannot be null" },
      notEmpty: { msg: "Signature data cannot be empty" },
    },
  },
});

module.exports = Signature;
