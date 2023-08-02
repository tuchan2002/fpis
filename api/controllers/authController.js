const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const web3Api = require("../configs/web3Config");
const { web3, contract } = web3Api;

let accountAddress = "";
web3.eth.getAccounts().then((accounts) => {
  accountAddress = accounts[0];
});

const authController = {
  register: async (req, res) => {
    const { name, email, password, location, phone_number, role } = req.body;

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
        location,
        phone_number,
        password: hashedPassword,
        role,
      };

      const createdUser = await db.User.create(newUser);
      createdUser.password = "";

      let isSavedToBlockchain;
      if (role === 0) {
        isSavedToBlockchain = await createManufactory(email, name, location);
      } else if (role === 1) {
        isSavedToBlockchain = await createRetailer(email, name, location);
      } else if (role === 2) {
        isSavedToBlockchain = await createCustomer(
          email,
          name,
          location,
          phone_number
        );
      }

      if (isSavedToBlockchain) {
        console.log("Register account successful.");

        return res.status(201).json({
          message: "Register account successful.",
          success: true,
          data: {
            user: createdUser,
          },
        });
      } else {
        console.log("Register account failed.");
        return res.status(500).json({ message: "Save to blockchain failed." });
      }
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
      const access_token = createAccessToken({
        userId: user.id,
        role: user.role,
      });
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
    console.log(req.userId);
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

const createManufactory = async (email, name, location) => {
  try {
    return await contract.methods.createManufactor(email, name, location).send({
      from: accountAddress,
    });
  } catch (error) {
    console.error(error);
  }
};

const createRetailer = async (email, name, location) => {
  try {
    return await contract.methods.createRetailer(email, name, location).send({
      from: accountAddress,
    });
  } catch (error) {
    console.error(error);
  }
};

const createCustomer = async (email, name, location, phone_number) => {
  try {
    return await contract.methods
      .createCustomer(email, name, location, phone_number)
      .send({
        from: accountAddress,
      });
  } catch (error) {
    console.error(error);
  }
};

module.exports = authController;
