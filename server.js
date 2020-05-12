const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);

//will return a promise with access to a connection object
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
