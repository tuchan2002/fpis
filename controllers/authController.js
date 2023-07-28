const bcrypt = require("bcrypt");
const db = require("../models");

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
};

module.exports = authController;
