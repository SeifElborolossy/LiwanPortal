const Employee = require('./employeeModel');
const Role = require('./roleModel');

const setupAssociations = () => {
    Role.hasMany(Employee, {
      foreignKey: 'role_id',
      as: 'users'
    });
  
    Employee.belongsTo(Role, {
      foreignKey: 'role_id',
      as: 'userRole'
    });
  };
  
  setupAssociations();
  
  module.exports = {
    Employee,
    Role
  };