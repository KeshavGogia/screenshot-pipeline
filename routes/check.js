const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller')

router.get('/', async (req, res) => {
  await controller.captureAndUpdate();
  res.send('Screenshot captured and readme updated.');
});

module.exports = router;
