const fs = require("fs");
const Device = require("./../models/deviceModel");

exports.getAllDevices = async (req, res) => {
  const devices = await Device.find();
  res.status(200).send({
    status: "success",
    results: devices.length,
    data: {
      devices,
    },
  });
};

exports.getDevice = async (req, res) => {
  const { id } = req.params;
  const device = await Device.findById(id);
  res.status(200).send({
    status: "success",
    data: {
      device,
    },
  });
};

exports.updateDevice = async (req, res) => {
  try {
    const { id } = req.params;

    //the updated document will be returned to the client with new: true
    const device = await Device.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        device,
      },
    });
  } catch (err) {
    res.send(err);
  }
};

exports.deleteDevice = async (req, res) => {
  const { id } = req.params;
  await Device.findByIdAndDelete(id);
  res.status(204).json({
    status: "success",
    data: null,
  });
};

exports.createDevice = async (req, res) => {
  try {
    const newDevice = await Device.create(req.body);
    res.status(201).send({
      status: "success",
      data: {
        device: newDevice,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
