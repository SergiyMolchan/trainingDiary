const express = require('express');
const router = express.Router();
const passport = require('passport');
const models = require('../models/CustomExercises');

router.use(express.json());
router.use(express.urlencoded({extended: false}));

router.get('/getCustomExercises', passport.authenticate('jwt', {session: false}), models.getCustomExercises);
router.post('/createCustomExercises', passport.authenticate('jwt', {session: false}), models.createCustomExercises);

module.exports = router;
