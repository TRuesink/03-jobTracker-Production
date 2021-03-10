const express = require("express");
const passport = require("passport");

const {
  authGoogle,
  authGoogleCallback,
  googleLogout,
  authGoogleToken,
  getMe,
} = require("../controllers/authController");

const { protect } = require("../middlewares/auth");

const router = express.Router();

router.route("/google").get(authGoogle);
router
  .route("/google/callback")
  .get(passport.authenticate("google"), authGoogleCallback);

router
  .route("/google/token")
  .get(passport.authenticate("google-token"), authGoogleToken);

router.route("/me").get(protect, getMe);

router.route("/logout").get(googleLogout);

module.exports = router;
