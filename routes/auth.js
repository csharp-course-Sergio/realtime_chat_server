/*
path: api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { createUser, loginUser } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    validateFields,
  ],
  loginUser
);

module.exports = router;
