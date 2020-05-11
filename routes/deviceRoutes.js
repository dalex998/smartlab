const express = require("express");

const router = express.Router();
const deviceController = require("./../controllers/deviceController");

router.param("id", deviceController.checkId);

router
  .route("/")
  .get(deviceController.getAllDevices)
  .post(deviceController.createDevice);

router
  .route("/:id")
  .get(deviceController.getDevice)
  .patch(deviceController.updateDevice)
  .delete(deviceController.deleteDevice);

module.exports = router;
