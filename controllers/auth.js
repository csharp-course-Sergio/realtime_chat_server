const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

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

    res.json({
      ok: true,
      user,
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
};
