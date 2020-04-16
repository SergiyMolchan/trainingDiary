const express = require('express');
const router = express.Router();
const models = require('../models/User');

router.use(express.json());
router.use(express.urlencoded({extended: false}));

router.post('/registration', models.regitration);
router.post('/login', models.login);

module.exports = router;
