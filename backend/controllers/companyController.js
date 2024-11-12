const catchAsync = require("../utils/catchAsync");
const Company = require("../models/companyModel");
const AppError = require("../utils/AppError");

exports.getallCompanies = catchAsync(async (req, res, next) => {
  const companies = await Company.findAll();

  res.status(200).json({
    status: "success",
    data: {
      companies,
    },
  });
});
exports.getCompanyById = catchAsync(async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findByPk(companyId);
  if (!company) {
    return next(new AppError("Company Not Found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      companies,
    },
  });
});
exports.createCompany = catchAsync(async (req, res, next) => {
  const company = await Company.create(req.body);
  if (!company) next(new AppError("failed to create Company", 400));
  res.status(201).json({
    status: "success",
    data: {
      company,
    },
  });
});
exports.updateCompany = catchAsync(async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findByPk(companyId);
  if (!company) {
    return next(new AppError("Company Not Found", 404));
  }
  await company.update(req.body);
  res.status(200).json({
    status: "success",
    data: {
      company,
    },
  });
});
exports.deleteCompany = catchAsync(async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findByPk(companyId);
  if (!company) {
    return next(new AppError("Company Not Found", 404));
  }
  await company.destroy();
  res.status(204).json({
    status: "success",
    data: null,
  });
});
