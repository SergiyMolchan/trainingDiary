const express = require('express');
const router = express.Router();
const passport = require('passport');
const models = require('../models/Workouts');

router.use(express.json());
router.use(express.urlencoded({extended: false}));

router.get('/getWorkouts', passport.authenticate('jwt', {session: false}), models.getWorkouts);
router.post('/saveWorkout', passport.authenticate('jwt', {session: false}), models.saveNewWorkout);

module.exports = router;
