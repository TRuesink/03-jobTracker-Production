const asyncHandler = require("../middlewares/async");
const passport = require("passport");

exports.authGoogle = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.authGoogleCallback = (req, res) => {
  res.status(200).redirect("/jobs/home");
};

exports.authGoogleToken = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

exports.getMe = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

exports.googleLogout = (req, res) => {
  req.logout();
  res.status(200).json({ success: true, user: null });
};
