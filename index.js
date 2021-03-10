const express = require("express");
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const cors = require("cors");
const passport = require("passport");
require("colors");
if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config({ path: "./config/config.env" });
}

const errorHandler = require("./middlewares/error");
require("./middlewares/passport");

//
const connectDB = require("./utils/connectDB");

// routers
const authRouter = require("./routers/authRouter");
const opportunityRouter = require("./routers/opportunityRouter");
const scriptRouter = require("./routers/scriptRouter");
const noteRouter = require("./routers/noteRouter");
const contactRouter = require("./routers/contactRouter");
const activityRouter = require("./routers/activityRouter");
const meetingRouter = require("./routers/meetingRouter");

// init server
const app = express();

// connect DB
connectDB();

// middlewares

app.use(morgan("dev")); // logging
app.use(express.json()); // body parsing
app.use(
  cookieSession({
    name: "jobTrackerSession",
    keys: [process.env.COOKIE_KEY],
    maxAge: 15 * 24 * 60 * 60 * 1000,
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// mount routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/opportunities", opportunityRouter);
app.use("/api/v1/scripts", scriptRouter);
app.use("/api/v1/notes", noteRouter);
app.use("/api/v1/contacts", contactRouter);
app.use("/api/v1/activities", activityRouter);
app.use("/api/v1/meetings", meetingRouter);

app.use(cors());

// custom error handler
app.use(errorHandler);

// if in production or test production, use react build
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "test_production"
) {
  // Express will serve production assets like our main.js file or main.css file
  app.use(express.static("client/build"));
  // Express will serve the index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// get the port
const PORT = process.env.PORT || 5000;

// listen
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`.yellow);
});
