const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const companyRouter = require("./routes/company");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequelize = require("./config/db"); // Sequelize instance


const app = express();
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const sessionStore = new SequelizeStore({
  db: sequelize,
  tableName: "sessions",
  checkExpirationInterval: 15 * 60 * 1000, //remove every 15 minutes
  expiration: 24 * 60 * 60 * 1000,
});

sessionStore.sync().catch((err) => {
  console.error("Error syncing session store:", err);
});

app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
    },
  })
);

function authorize(allowedRoles) {
  return (req, res, next) => {
    const role = req.session.user.role;
    console.log(role);

    // Check if user is logged in and has the required role
    if (role && allowedRoles.includes(role)) {
      return next(); // User is authorized
    }

    res.status(403).send("Access forbidden: Insufficient permissions");
  };
}

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  req.session.user = {
    id: 1,
    username: username,
    role: "test",
    loggedInAt: new Date(),
  };

  res.json({ message: "Logged in successfully" });
});

app.get("/profile", (req, res) => {
  // Check if user is authenticated
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  res.json({ user: req.session.user });
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.json({ message: "Logged out successfully" });
  });
});
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
};
app.use("/api/v1/companies", companyRouter);

app.get("/protected", requireAuth, authorize(["test"]), (req, res) => {
  res.json({ message: "This is a protected route", user: req.session.user });
});

app.get("/", (req, res) => {
  console.log("hello");
});

module.exports = app;
