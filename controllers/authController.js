const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

const authController = {
  register: async (req, res) => {
    const { name, email, password, address, phone_number } = req.body;

    try {
      const user = await db.User.findOne({
        where: {
          email: email,
        },
      });
      if (user) {
        return res
          .status(400)
          .json({ message: "Email address already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        name,
        email,
        address,
        phone_number,
        password: hashedPassword,
      };

      const createdUser = await db.User.create(newUser);
      createdUser.password = "";

      return res.status(201).json({
        message: "Register account successfully.",
        success: true,
        data: {
          user: createdUser,
        },
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await db.User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        return res
          .status(400)
          .json({ message: "A user with email could not be found." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Incorrect email or password." });
      }

      const access_token = createAccessToken({ id: user.id });
      return res.json({
        message: "Login successfully.",
        success: true,
        data: {
          access_token,
          user: user,
        },
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = authController;
