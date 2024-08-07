/*
path: api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { createUser, loginUser, renewToken } = require("../controllers/auth");

const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

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

//validateJWT
router.get("/renew", validateJWT, renewToken);

module.exports = router;