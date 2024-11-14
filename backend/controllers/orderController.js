const { Employee, Role, Order, EmployeeOrder } = require("../models/assosciations");
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { Sequelize } = require('sequelize');
const validator = require("validator");
const db = require("../config/db"); // Sequelize instance

const getRequiredPrecedence = (price) => {
  if (price > 1000) return 5;
  if (price > 500) return 3;
  return 1;
};

// Helper function to find the next role
const findNextRole = async (currentPrecedence, transaction) => {
  return await Role.findOne({
    where: {
      precedence: {
        [Sequelize.Op.gt]: currentPrecedence
      }
    },
    order: [['precedence', 'ASC']],
    transaction
  });
};

// Function to initiate the approval process
const initiateApprovalProcess = async (order, transaction) => {



  const orderingEmployee = await Employee.findByPk(order.employee_id, {
    include: [{ model: Role, as: "employeeRole" }],
    transaction
  });

console.log(order.employee_id);

  if (!orderingEmployee || !orderingEmployee.employeeRole) {
    throw new AppError("Employee or role not found", 404);
  }

  const requiredPrecedence = getRequiredPrecedence(order.price);
  
  // If employee has sufficient precedence, they can self-approve
  if (orderingEmployee.employeeRole.precedence >= requiredPrecedence) {
    await order.update({
      final_status: 'approved',
      approval_chain: [{
        role_id: orderingEmployee.role_id,
        status: 'approved',
        timestamp: new Date(),
        comment: 'Self-approved based on precedence'
      }]
    }, { transaction });
    return;
  }

  // Find the next role that needs to review
  const nextRole = await findNextRole(orderingEmployee.employeeRole.precedence, transaction);
  if (!nextRole) {
    throw new AppError("No suitable approver found", 500);
  }

  // Update order with initial approver
  await order.update({
    current_approver_role_id: nextRole.id,
    approval_chain: [{
      role_id: orderingEmployee.role_id,
      status: 'forwarded',
      timestamp: new Date(),
      comment: 'Insufficient precedence, forwarded to next level'
    }]
  }, { transaction });
};

// Controller for handling role decisions
exports.handleRoleDecision = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;
  const { decision, comment } = req.body;
  const employee_id = req.session.user.id; // Assuming authenticated user

  const transaction = await db.transaction();

  try {
    const employee = await Employee.findByPk(employee_id, {
      include: [{ model: Role, as: "employeeRole" }],
      transaction
    });

    const order = await Order.findByPk(orderId, { transaction });

    if (!order || !employee || !employee.employeeRole) {
      throw new AppError("Order or employee role not found", 404);
    }

    if (order.current_approver_role_id !== employee.role_id) {
      throw new AppError("Not authorized to make this decision", 403);
    }

    const requiredPrecedence = getRequiredPrecedence(order.price);

    // Update approval chain
    const approvalChain = [...(order.approval_chain || []), {
      role_id: employee.role_id,
      status: decision,
      timestamp: new Date(),
      comment
    }];

    if (decision === 'approve') {
      if (employee.employeeRole.precedence >= requiredPrecedence) {
        // Final approval
        await order.update({
          final_status: 'approved',
          approval_chain: approvalChain,
          current_approver_role_id: null
        }, { transaction });
      } else {
        // Find next role in hierarchy
        const nextRole = await findNextRole(employee.employeeRole.precedence, transaction);
        if (!nextRole) {
          throw new AppError("No higher role found for approval", 500);
        }

        await order.update({
          approval_chain: approvalChain,
          current_approver_role_id: nextRole.id
        }, { transaction });
      }
    } else if (decision === 'reject') {
      await order.update({
        final_status: 'rejected',
        approval_chain: approvalChain,
        current_approver_role_id: null
      }, { transaction });
    } else {
      throw new AppError("Invalid decision", 400);
    }

    await transaction.commit();

    res.status(200).json({
      status: "success",
      data: { order }
    });
  } catch (error) {
    await transaction.rollback();
    return next(new AppError(error.message, 500));
  }
});

// Controller for creating an order (unchanged)
exports.createOrder = catchAsync(async (req, res, next) => {
  const { company_id, employee_id, price, details, attachment } = req.body;

  // Input validation
  if (!company_id || !employee_id || !price || !details || 
      !validator.isNumeric(price.toString())) {
    return next(new AppError("Invalid input data (Can't be null)", 400));
  }

  // Start transaction
  const transaction = await db.transaction();

  try {
    // Create the new order
    const order = await Order.create({
      company_id,
      employee_id,
      price,
      details,
      attachment,
      delivery_status: "pending",
      payment_method: "cash",
      created_at: new Date(),
      final_status: 'pending'
    }, { transaction });

    // Initialize the approval process
    await initiateApprovalProcess(order, transaction);

    await transaction.commit();

    res.status(201).json({
      status: "success",
      data: { order }
    });
  } catch (error) {
    await transaction.rollback();
    return next(new AppError(error.message, 500));
  }
});

// Controller for getting all orders (unchanged)
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.findAll();
  res.status(200).json({
    status: "success",
    data: {
      orders
    }
  });
});
