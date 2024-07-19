const { response } = require("express");
const User = require("../models/user");

const createUser = async (req, res = response) => {
  const { email } = req.body;

  try {
    const emailExist = await User.findOne({ email });

    if (emailExist)
      return res.status(400).json({
        ok: false,
        msg: "El correo ya está registrado",
      });

    const user = new User(req.body);
    await user.save();

    res.json({
      ok: true,
      user
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
