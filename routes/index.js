const express = require("express");
const router = express.Router();

router.use('/contacts', require('./contacts/index'));

module.exports = router;