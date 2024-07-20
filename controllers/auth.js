const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const emailExist = await User.findOne({ email });

    if (emailExist)
      return res.status(400).json({
        ok: false,
        msg: "El correo ya está registrado",
      });

    const user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const userDb = await User.findOne({ email });
    if (!userDb)
      return res.status(404).json({
        ok: false,
        msg: "El correo no está registrado",
      });

    const validPassword = bcrypt.compareSync(password, userDb.password);
    if (!validPassword)
      return res.status(400).json({
        ok: false,
        msg: "Credenciales no válidas",
      });

    const token = await generateJWT(userDb.id);

    res.json({
      ok: true,
      user: userDb,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const renewToken = async (req, res = response) => {
  try {
    const uid = req.uid;
    const token = await generateJWT(uid);
    const user = await User.findById(uid);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};