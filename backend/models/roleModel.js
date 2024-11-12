const Sequelize = require("sequelize");
const db = require("../config/db");

const Role = db.define("Role", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
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
});

module.exports = Role;
