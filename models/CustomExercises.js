const mongoose = require('mongoose');
const User = require('./User');



module.exports.getCustomExercises = async (req, res) => {
  try {
    const user = await User.findById({_id: req.user.id});
    res.status(200).json({success: true, customExercises: user.exercises});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Error on server."});
  }
}

module.exports.createCustomExercises = async (req, res) => {
  try {
    const exercise = {
      title: req.body.title,
      muscleGroups: req.body.muscleGroups
    };
    const user = await User.findByIdAndUpdate({_id: req.user.id}, {$push: {exercises: exercise}}, {new: true});
    res.status(200).json({success: true, customExercises: user.exercises});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Error on server."});
  }
}
