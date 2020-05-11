const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutsSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true
  },
  dateOfTraining: {
    type: Number,
    required: true
  },
  exercises: [{
    title: {
      type: String,
      required: true
    },
    muscleGroups: [{
      type: String
    }],
    exerciseApproaches: [{
      weight: {
        type: Number
      },
      reps: {
        type: Number
      }
    }]
  }],
  userOfWeight: {
    type: Number,
    required: true
  }
});

const Workouts = module.exports = mongoose.model('Workouts', WorkoutsSchema);

module.exports.saveNewWorkout = async (req, res) => {
  try{
    if(!req.body.exercises) {
      res.status(409).json({success: false, message: 'Add exercises.'});
    } else if (!req.body.userOfWeight) {
      res.status(409).json({success: false, message: 'Indicate your weight.'});
    } else {
      const workout = new Workouts({
        user: req.user.id,
        dateOfTraining: req.body.dateOfTraining || Date.now,
        exercises: req.body.exercises,
        userOfWeight: req.body.userOfWeight
      });

      await workout.save();
      const workouts = await Workouts.find({user: req.user.id, dateOfTraining: {$gt: getCurrentMonth()}});
      res.status(201).json({success: true, workouts: workouts});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Error on server."});
  }
};

module.exports.getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workouts.find({user: req.user.id});
    res.status(201).json({success: true, workouts: workouts});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Error on server."});
  }
};

module.exports.getWorkoutsByCurrentMonth = async (req, res) => {
  try {
    const workouts = await Workouts.find({user: req.user.id, date: {$gt: getCurrentMonth()}});
    res.status(201).json({success: true, workouts: workouts});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Error on server."});
  }
};

getCurrentMonth = () => new Date(Date.now() - (new Date().getDate() * 86400 * 1000 + new Date().getHours() * 3600 * 1000 + new Date().getMinutes() * 60 * 1000 + new Date().getSeconds() * 1000) + 60 * 60 * 24 * 1000);

