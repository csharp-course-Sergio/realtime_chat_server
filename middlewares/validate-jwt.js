const jwt = require("jsonwebtoken");
const { response } = require("express");

const validateJWT = (req, res = response, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({
      ok: false,
      msg: "No token provided or invalid token",
    });

  try {
    const token = authHeader.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
  }
};

module.exports = {
  validateJWT,
};
