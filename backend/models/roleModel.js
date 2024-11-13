const Sequelize = require("sequelize");
const db = require("../config/db");
const generateId = require("../utils/generateid");

const Role = db.define(
  "role",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      defaultValue: generateId,
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
  },
  {
    timestamps: false,
    tableName: "roles",
  }
);

module.exports = Role;
