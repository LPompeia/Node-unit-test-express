const express = require('express');
const router = express.Router();

const bankRoute = require('../route/bankRoute');
router.get('', bankRoute.getClients);

module.exports = router;