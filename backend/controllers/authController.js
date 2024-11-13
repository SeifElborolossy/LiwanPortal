// Create Auth controller

const catchAsync = require("../utils/catchAsync");
const Employee = require("../models/employeeModel");
const AppError = require("../utils/AppError");
const { comparePassword } = require("../utils/helpers");

exports.requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
};

exports.authorize = (allowedRoles) => {
  return (req, res, next) => {
    const role = req.session.user.role.name;
    console.log(role);

    if (role && allowedRoles.includes(role)) {
      return next();
    }

    res.status(403).send("Access forbidden: Insufficient permissions");
  };
};

exports.login = catchAsync(async (req, res, next) => {
  if (req.session.user) {
    return res.status(200).json({
      status: "Error",
      message: "Already logged in",
    });
  }

  let { email, password } = req.body;

  const user = await Employee.findOne({ where: { email }, include: "role" });

  if (user) {
    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) {
      return next(new AppError("Invalid email or password", 401));
    }
  }

  if (!user) {
    return next(new AppError("Invalid email or password", 401));
  }

  req.session.user = {
    id: user.id,
    name: user.name,
    role: user.role.name,
  };

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
exports.logout = catchAsync(async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(new AppError("Error logging out. Please try again.", 500));
    }

    res.clearCookie("session");

    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  });
});
