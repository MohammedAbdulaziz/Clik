require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const connectDB = require("./src/config/database");
const indexRouter = require("./src/routes/index");
const usersRouter = require("./src/routes/users");
const checkoutRouter = require("./src/routes/checkout");
const paymentRouter = require("./src/routes/payments");
const orderRouter = require("./src/routes/order");
const productRouter = require("./src/routes/products");
const cartRouter = require("./src/routes/cart");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cors());
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/checkout", checkoutRouter);
app.use("/payments", paymentRouter);
app.use("/order", orderRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
