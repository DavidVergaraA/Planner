const UserModel = require('../models/userModel');

async function attachUser(req, res, next) {
  try {
    const user = await UserModel.getOrCreateDefaultUser();
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = attachUser;
