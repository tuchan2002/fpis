const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const requestHeader = req.header("Authorization");
  const token = requestHeader && requestHeader.split(" ")[1];

  console.log("1 ok", token);
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access token not found." });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Invalid token." });
  }
};

module.exports = verifyToken;
