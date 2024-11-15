const Sequelize = require("sequelize");
const db = require("../config/db");

const Role = db.define(
  "role",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Role name cannot be null",
        },
        notEmpty: {
          msg: "Role name is required",
        },
      },
    },
    permissions: {
      type: Sequelize.JSON,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Permissions cannot be null",
        },
        notEmpty: {
          msg: "Permissions are required",
        },
      },
    },
    precedence: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Role precedence cannot be null",
        },
        isInt: {
          msg: "Role precedence must be an integer",
        },
      },
    },
  },
  {
    timestamps: false,
    tableName: "roles",
  }
);

module.exports = Role;
