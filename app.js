const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");
const session = require("express-session");
const flash = require("connect-flash");

const indexRouter = require("./routes/index"); // Web routes
const usersRouter = require("./routes/users");
const apiRouter = require("./routes/api"); // API routes
const adminRouter = require("./routes/admin"); // Admin routes
const authRouter = require("./routes/auth"); // Admin routes

const passport = require("./config/passport");

const app = express();


app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", apiRouter); // API route handling
app.use("/admin", adminRouter); // Admin route handling
app.use("/auth", authRouter); // Auth route handling

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
