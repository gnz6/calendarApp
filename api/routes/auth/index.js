const express = require('express');
const router = express.Router();
const {login, register, refreshToken} = require("../../controllers/auth")

router.get('/', (req, res) => {})

router.post("/register", register)

router.post("/login", login)

router.post("/refresh", refreshToken)


module.exports = router;



