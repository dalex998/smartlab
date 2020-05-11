const express = require("express");
const morgan = require("morgan");

const deviceRouter = require("./routes/deviceRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/api/v1/devices", deviceRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
