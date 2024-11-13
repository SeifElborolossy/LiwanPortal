const Sequelize = require("sequelize");
const db = require("../config/db");

const Order = db.define(
  "order",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    delivery_status: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Delivery status cannot be null",
        },
        notEmpty: {
          msg: "Delivery status is required",
        },
      },
    },
    payment_method: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Payment method cannot be null",
        },
        notEmpty: {
          msg: "Payment method is required",
        },
      },
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Creation date cannot be null",
        },
      },
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price cannot be null",
        },
        isInt: {
          msg: "Price must be an integer",
        },
      },
    },
    details: {
      type: Sequelize.JSON,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Details cannot be null",
        },
        notEmpty: {
          msg: "Details are required",
        },
      },
    },
    attachment: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    employee_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Employee ID cannot be null",
        },
        isInt: {
          msg: "Employee ID must be an integer",
        },
      },
    },
    company_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Customer ID cannot be null",
        },
        isInt: {
          msg: "Customer ID must be an integer",
        },
      },
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: "Pending Approval",
    },
  },
  {
    timestamps: false,
    tableName: "orders",
  }
);

module.exports = Order;
