// models/Employee.js
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
const validator = require("validator");
const db = require("../config/db"); // Import Sequelize instance
const generateId = require("../utils/generateid");

const Employee = db.define(
  "employee",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      defaultValue: generateId,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "This email is already exist",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password is required." },
        notEmpty: { msg: "Password cannot be empty." },
        len: {
          args: [8, 100],
          msg: "Password must be at least 8 characters long.",
        },
      },
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Role is required." },
        notEmpty: { msg: "Role cannot be empty." },
      },
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    extension_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Extension number is required." },
        isInt: {
          args: true,
          msg: "Extension number must be an integer.",
        },
        isFourDigits(value) {
          const valueString = value.toString().padStart(4, "0");
          if (!validator.isInt(valueString, { min: 0, max: 9999 })) {
            throw new Error(
              "Extension number must be a 4-digit number, from 0000 to 9999."
            );
          }
        },
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Role is required." },
        notEmpty: { msg: "Role cannot be empty." },
      },
      references: {
        model: "roles",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "employee",
  }
);

module.exports = Employee;
