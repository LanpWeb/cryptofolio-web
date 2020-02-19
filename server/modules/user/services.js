const User = require("./model");

exports.getUserById = async userId => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    throw Error("Error while quering user.");
  }
};

exports.getUserByEmail = async email => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    throw Error("Error while quering user by email.");
  }
};

exports.isUniqueEmail = async email => {
  try {
    return await User.where({ email }).countDocuments() === 0;
  } catch (err) {
    throw Error("Error while quering user's unique email.");
  }
};

exports.createUser = async (email, password) => {
  try {
    const user = await User.create({ email, password });
    return user;
  } catch (err) {
    throw Error("Error while creating user.");
  }
};

exports.appendRefreshToken = async (userId, refreshToken) => {
  try {
    await User.findByIdAndUpdate(userId, { $push: { refreshTokens: refreshToken } });
  } catch (err) {
    throw Error("Error while updating user's refresh token.");
  }
};

exports.replaceRefreshTokens = async (userId, refreshTokens) => {
  try {
    await User.findByIdAndUpdate(userId, { refreshTokens });
  } catch (err) {
    throw Error("Error while updating user's refresh tokens.");
  }
};

exports.toggleWatchlist = async (userId, watchlist, coinId) => {
  try {
    if (watchlist.length !== 0 && watchlist.includes(parseInt(coinId, 10))) {
      const newWatchlist = watchlist.filter(item => item !== parseInt(coinId, 10));
      await User.findByIdAndUpdate(userId, { watchlist: newWatchlist });
    } else {
      await User.findByIdAndUpdate(userId, { $push: { watchlist: coinId } });
    }
  } catch (err) {
    throw Error("Error while updating watchlist.");
  }
};

exports.changePassword = async (userId, password) => {
  try {
    await User.update({ _id: userId }, { $set: { password } });
  } catch (err) {
    throw Error("Error while changing password.");
  }
};
