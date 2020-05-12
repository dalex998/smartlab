const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  model: {
    type: String,
    required: [true, "A device must have a model"],
  },
  buyPrice: {
    type: Number,
    required: [true, "A device must have a name!"],
  },
  SellPrice: Number,
});

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;
