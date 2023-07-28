const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

const authController = {
  register: async (req, res) => {
    const { name, email, password, address, phone_number, role } = req.body;

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
        role,
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
          .json({ message: "Incorrect email or password." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Incorrect email or password." });
      }

      user.password = "";
      const access_token = createAccessToken({ userId: user.id });
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
  getAuth: async (req, res) => {
    try {
      const user = await db.User.findOne({
        attributes: { exclude: ["password"] },
        where: {
          id: req.userId,
        },
      });

      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      } else {
        return res.status(200).json({
          success: true,
          data: {
            user: user,
          },
        });
      }
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
