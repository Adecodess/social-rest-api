const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createToken } = require("../services/jwtservice");
// Register
exports.registerNewUser = async (req, res) => {
  try {
    // generate password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // fetch user from re.body
    await User.findOne({ username: req.body.username }, (err, existingUser) => {
      if (err) {
        return res.status(500).json({ err });
      }
      // check if user exists
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "a user with this username exits" });
      }
    });

    // create new user
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    //   save user and return response
    const user = await newUser.save();

    // create jwt token for user
    let token = createToken(newUser);
    if (!token) {
      res
        .status(500)
        .json({ message: "sorry we could not authenticate you please login" });
    }

    //   send token to user
    res
      .status(200)
      .json({ message: "user registration successful", token, user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    // check if user exits
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    // check and compare password
    const validPassword = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).json({ message: "wrong password" });
    }
    // create a token for the user
    let token = createToken(user);
    if (!token) {
      return res
        .status(500)
        .json({ message: "sorry we could not authenticate you please login" });
    } else {
      // send token to user
      return res
        .status(200)
        .json({ message: "user logged in successfully", token, user });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
