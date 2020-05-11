const express = require('express');
const router = express.Router();
const passport = require('passport');
const models = require('../models/Workouts');

router.use(express.json());
router.use(express.urlencoded({extended: false}));

router.get('/getWorkoutsByCurrentMonth', passport.authenticate('jwt', {session: false}), models.getWorkoutsByCurrentMonth);
router.get('/getAllWorkouts', passport.authenticate('jwt', {session: false}), models.getAllWorkouts);
router.post('/saveWorkout', passport.authenticate('jwt', {session: false}), models.saveNewWorkout);

module.exports = router;
