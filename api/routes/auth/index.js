const express = require('express');
const router = express.Router();
const {validateJWT} = require('../../middlewares/validateJWT');


const { check, } = require("express-validator")
const { validateFields } = require('../../middlewares/validateFields');
const { login, register, refreshToken } = require("../../controllers/auth");

router.get('/', (req, res) => { })

router.post("/register",
    [check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe tener al menos 6 caracteres").isLength({ min: 6 }),
    validateFields
    ],
    register)

router.post("/login",
    [check("email", "El email es obligatorio").isEmail(),
     check("password", "El password debe tener al menos 6 caracteres").isLength({ min: 6 }),
     validateFields
    ], login)

router.post("/refresh", validateJWT , refreshToken)


module.exports = router;



