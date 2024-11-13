const { Employee, Role, Order, EmployeeOrder } = require("../models/associations");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const validator = require("validator");

exports.createOrder   
 = catchAsync(async (req, res, next) => {
  const { customerId, employeeId, price, details, attachment } = req.body;

  // Input validation
  if (
    !customerId ||
    !employeeId ||
    !price ||
    !details ||
    !validator.isNumeric(price.toString())
  ) {
    return next(new AppError("Invalid input data", 400));
  }

  // Create the new order
  const order = await Order.create({
    customerId,
    employeeId,
    price,
    details,
    attachment,
    delivery_status: "pending",
    payment_method: "cash",
    created_at: new Date(),
  });

  // Start the role-based notification process
  try {
    await initiateNotificationProcess(order);
  } catch (error) {
    // Log the error for debugging
    console.error("Error initiating notification process:", error);

    // Return a generic error message to the client
    return next(new AppError("Failed to create order", 500));
  }

  res.status(201).json({
    status: "success",
    data: { order },
  });
});

// Role-based notification process logic
const initiateNotificationProcess = async (order) => {
  // Find the employee associated with the order
  const employee = await Employee.findByPk(order.employeeId, {
    include: [
      {
        model: Role,
        as: "employeeRole",
      },
    ],
  });

  if (!employee || !employee.employeeRole) {
    throw new AppError("Employee or role not found", 404);
  }

  // Check if the employee's role has sufficient precedence
  if (employee.employeeRole.precedence >= getRequiredPrecedence(order.price)) {
    // No need for further notification, the employee can approve/deny
    return;
  }

  // Find the next higher role
  const nextHigherRoleId = await getNextHigherRole(employee.employeeRole.precedence);

  if (!nextHigherRoleId) {
    // No higher role found, handle accordingly (e.g., assign to a default role)
    // For now, throw an error
    throw new AppError("No higher role found for notification", 500);
  }

  // Add the order to the higher role's list of orders
  const higherRoleEmployee = await Employee.findByPk(nextHigherRoleId);

  try {
    await higherRoleEmployee.addPendingOrder(order); // Use the new association method
  } catch (error) {
    // Handle potential errors during the association
    console.error("Error adding order to employee queue:", error);
    throw new AppError("Failed to notify higher role", 500);
  }
};

// Helper function to determine required precedence based on order price
const getRequiredPrecedence = (price) => {
  // Implement your logic here based on price ranges
  if (price > 1000) {
    return 3; // Example: Precedence 3 required for orders over $1000
  } else if (price > 500) {
    return 2; // Example: Precedence 2 required for orders over $500
  } else {
    return 1; // Example: Precedence 1 for other orders
  }
};

// Helper function to find the next higher role
const getNextHigherRole = async (currentPrecedence) => {
  try {
    const role = await Role.findOne({
      where: {
        precedence: {
          // Find the role with the nearest higher precedence
          $gt: currentPrecedence, // Greater than the current precedence
        },
      },
      order: [["precedence", "ASC"]], // Order by precedence in ascending order
    });

    return role ? role.id : null; // Return role ID or null if no higher role is found
  } catch (error) {
    // Handle any potential errors here
    console.error("Error finding next higher role:", error);
    throw error; // Re-throw the error to be caught by the global error handler
  }
};