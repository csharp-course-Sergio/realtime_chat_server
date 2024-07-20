const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) reject("No se pudo generar el JWT");
        return resolve(token);
      }
    );
  });
};

const checkJWT = (authHeader = "") => {
  try {
    const token = authHeader.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};

module.exports = {
  generateJWT,
  checkJWT,
};
