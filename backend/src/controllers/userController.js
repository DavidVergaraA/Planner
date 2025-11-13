const UserModel = require('../models/userModel');

async function getProfile(req, res, next) {
  try {
    const user = await UserModel.getUserById(req.user.id);
    res.json({ user });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProfile,
};
