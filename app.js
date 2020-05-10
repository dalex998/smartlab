const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

const devices = JSON.parse(fs.readFileSync("./data/devices.json"));

const getAllDevices = (req, res) => {
  res.status(200).send({
    status: "success",
    length: devices.length,
    data: { devices },
  });
};

const getDevice = (req, res) => {
  const { id } = req.params;
  const device = devices.find((device) => device.id === id * 1);
  if (!device)
    return res.status(404).send({
      status: "fail",
      message: "Invalid device ID",
    });

  res.status(200).send({
    status: "success",
    data: { device },
  });
};

const updateDevice = (req, res) => {
  const id = req.params.id;
  const device = devices.find((device) => device.id === id * 1);
  if (!device)
    return res.status(400).json({
      status: "fail",
      message: "Invalid device ID",
    });

  res.status(200).json({
    status: "success",
    data: {
      device: "Updated device here...",
    },
  });
};

const deleteDevice = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};

const createDevice = (req, res) => {
  const device = req.body;
  //console.log(device);
  const newId = devices[devices.length - 1].id + 1;

  const newdevice = Object.assign({ id: newId }, device);
  devices.push(newdevice);
  fs.writeFile(
    `${__dirname}/data/devices.json`,
    JSON.stringify(devices),
    (err) => {
      res.status(201).send({
        status: "success",
        data: { newdevice },
      });
    }
  );
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route not yet defined",
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route not yet defined",
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route not yet defined",
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route not yet defined",
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route not yet defined",
  });
};

const deviceRouter = express.Router();
const userRouter = express.Router();

deviceRouter.route("/").get(getAllDevices).post(createDevice);
deviceRouter
  .route(":id")
  .get(getDevice)
  .patch(updateDevice)
  .delete(deleteDevice);

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

app.use("/api/v1/devices", deviceRouter);
app.use("/api/v1/users", userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
