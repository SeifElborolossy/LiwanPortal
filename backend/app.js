const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const companyRouter = require("./routes/company");
const employeeRouter = require("./routes/employee");
const authRouter = require("./routes/auth");
const roleRouter = require("./routes/role");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");

const sequelize = require("./config/db"); // Sequelize instance

const app = express();
app.use(express.json());
app.use(morgan("dev"));


const sessionStore = new SequelizeStore({
  db: sequelize,
  tableName: "sessions",
  checkExpirationInterval: 15 * 60 * 1000, //remove every 15 minutes
  expiration: 24 * 60 * 60 * 1000,
});

sessionStore.sync({ force : true}).catch((err) => {
  console.error("Error syncing session store:", err);
});

app.use(
  session({
    store: sessionStore,
    name: "session",
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
    },
  })
);

app.use("/api/v1/companies", companyRouter);
app.use("/api/v1/employees", employeeRouter);
app.use("/api/v1/roles", roleRouter);
app.use("/api/v1/auth", authRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
/////
// app.get("/protected", requireAuth, authorize(["test"]), (req, res) => {
//   res.json({ message: "This is a protected route", user: req.session.user });
// });

app.use(globalErrorHandler);
module.exports = app;
