const { Order, Company, Employee } = require("../models/assosciations");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.createOrder = catchAsync(async (req, res, next) => {
  const empId = req.session.user.id;
  const { compId } = req.body;
  const comp = await Company.findByPk(compId);
  if (!comp) {
    return next(new AppError("Company not found", 404));
  }
  const order = await Order.create({ ...req.body, empId, compId });
  res.status(200).json({
    status: "success",
    data: { order },
  });
});
// exports.getAllOrders = catchAsync(async (req, res, next) => {
//   const orders = await Order.findAll();
// });
