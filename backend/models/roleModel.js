const Sequelize = require("sequelize");
const db = require("../config/db");
const generateId = require('../utils/generateID')
const Person = require('../models/personModel')

const Role = db.define("role", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    defaultValue : generateId
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

// One to M
Role.hasMany(Person, {
  foreignKey: 'roleId',
  as: 'users'
})

//Many to one
Person.belongsTo(Role, {
  foreignKey: 'roleId',
  as: 'userRole'
})


module.exports = Role;
