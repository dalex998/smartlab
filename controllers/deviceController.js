const fs = require("fs");
const Device = require("./../models/deviceModel");

exports.getAllDevices = (req, res) => {
  res.status(200).send({
    status: "success",
    length: devices.length,
    data: { devices },
  });
};

exports.getDevice = (req, res) => {
  res.status(200).send({
    status: "success",
    data: { device },
  });
};

exports.updateDevice = (req, res) => {
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
  res.status(201).send({
    status: "success",
    data: { newdevice },
  });
};
