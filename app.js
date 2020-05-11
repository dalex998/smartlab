const express = require("express");
const morgan = require("morgan");

const deviceRouter = require("./routes/deviceRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use("/api/v1/devices", deviceRouter);
app.use("/api/v1/users", userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
