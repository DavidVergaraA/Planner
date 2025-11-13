const { validationResult } = require('express-validator');
const HabitModel = require('../models/habitModel');
const ProgressModel = require('../models/progressModel');

async function getHabits(req, res, next) {
  try {
    const habits = await HabitModel.listHabits(req.user.id);
    res.json({ habits });
  } catch (error) {
    next(error);
  }
}

async function createHabit(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newHabit = await HabitModel.createHabit(req.user.id, req.body);
    res.status(201).json({ habit: newHabit });
  } catch (error) {
    next(error);
  }
}

async function completeHabit(req, res, next) {
  try {
    const { habitId } = req.params;
    const { pointsEarned } = req.body;
    await HabitModel.logHabitCompletion(habitId, pointsEarned);
    await ProgressModel.updatePetExperience(req.user.id, pointsEarned);
    res.status(201).json({ message: 'Habit logged successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getHabits,
  createHabit,
  completeHabit,
};
