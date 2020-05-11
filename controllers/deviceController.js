const fs = require("fs");

const devices = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/devices.json`)
);

exports.checkId = (req, res, next, val) => {
  const device = devices.find((device) => device.id === val * 1);
  if (!device)
    return res.status(404).send({
      status: "fail",
      message: "Invalid device ID",
    });
  next();
};

exports.getAllDevices = (req, res) => {
  res.status(200).send({
    status: "success",
    length: devices.length,
    data: { devices },
  });
};

exports.getDevice = (req, res) => {
  const { id } = req.params;
  const device = devices.find((device) => device.id === id * 1);

  res.status(200).send({
    status: "success",
    data: { device },
  });
};

exports.updateDevice = (req, res) => {
  const id = req.params.id;
  const device = devices.find((device) => device.id === id * 1);

  res.status(200).json({
    status: "success",
    data: {
      device: "Updated device here...",
    },
  });
};

exports.deleteDevice = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};

exports.createDevice = (req, res) => {
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
