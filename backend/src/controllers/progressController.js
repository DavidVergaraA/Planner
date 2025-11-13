const ProgressModel = require('../models/progressModel');

async function getSummary(req, res, next) {
  try {
    const summary = await ProgressModel.getProgressSummary(req.user.id);
    const badges = await ProgressModel.listBadges(req.user.id);
    const pet = await ProgressModel.getPet(req.user.id);
    res.json({ summary, badges, pet });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getSummary,
};
