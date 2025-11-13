const express = require('express');
const { body } = require('express-validator');
const HabitController = require('../controllers/habitController');

const router = express.Router();

router.get('/', HabitController.getHabits);

router.post(
  '/',
  [
    body('title').isLength({ min: 3 }).withMessage('El título debe tener al menos 3 caracteres'),
    body('description').isLength({ min: 5 }).withMessage('Describe el hábito para reforzar tu intención'),
    body('cadence').isIn(['daily', 'weekly', 'custom']).withMessage('Selecciona una frecuencia válida'),
    body('priority').isInt({ min: 1, max: 5 }).withMessage('La prioridad va de 1 a 5'),
    body('rewardPoints').isInt({ min: 5, max: 100 }).withMessage('Los puntos de recompensa deben motivarte sin ser exagerados'),
  ],
  HabitController.createHabit
);

router.post('/:habitId/complete', HabitController.completeHabit);

module.exports = router;
