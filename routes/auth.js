/*
path: api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { createUser } = require("../controllers/auth");

const router = Router();

router.post(
  "/new",
  [check("name", "El nombre es obligatorio").not().isEmpty()],
  createUser
);

module.exports = router;
