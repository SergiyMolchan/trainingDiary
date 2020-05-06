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
      const workouts = await Workouts.find({user: req.user.id}).sort({dateOfTraining: -1});
      res.status(201).json({success: true, workouts: workouts});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Error on server."});
  }
};

module.exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workouts.find({user: req.user.id}).sort({dateOfTraining: -1});
    res.status(201).json({success: true, workouts: workouts});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Error on server."});
  }
};
