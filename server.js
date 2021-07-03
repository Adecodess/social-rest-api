/**
 * 1. creating a express server
 * 2. connect to mongodb
 * 3. initialize express
 * 4. initialise express middleware
 * 5. create a simple get request route
 * 6. inject our routes
 * 7. listen to our app
 */

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

require("dotenv").config();

const connectDB = require("./db");
const { PORT } = process.env;

// connect database
connectDB();

// initalise express
const app = express();

// require routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// initialise  middleware
app.use(express.json({ extended: false }));
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// port
const port = process.env.PORT || PORT;

app.get("/", (req, res) => {
  res.send("welcome to homepage");
});

// listen to connection
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
