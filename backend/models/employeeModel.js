// models/Employee.js
const { DataTypes } = require("sequelize");
const validator = require("validator");
const db = require("../config/db"); // Import Sequelize instance

const Employee = db.define(
  "employee",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "This phone number is already exist",
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
        notNull: { msg: "nationality is required." },
        notEmpty: { msg: "nationality cannot be empty." },
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
      allowNull: true,
      references: {
        model: "roles", // Specifies the table name 'roles' that this foreign key refers to
        key: "id", // Specifies the column in the referenced table
      },

      onUpdate: "CASCADE", // Optional: Ensures changes in 'roles' table are cascaded
      onDelete: "SET NULL", // Optional: Sets 'role_id' to null if related role is deleted
    },
  },
  {
    timestamps: false,
    tableName: "employee",
  }
);

module.exports = Employee;
