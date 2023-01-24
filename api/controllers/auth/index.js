const { response } = require("express")
const { createToken } = require("../../helpers/jwt")


const bcrypt = require("bcrypt")
const User = require("../../models/User")


const register = async (req, res = response) => {
    const { name, email, password } = req.body

    try {
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({ ok: false, error: "User already exists" })

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)


        user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const token = await createToken(user._id, user.name)


        res.status(201).json({
            ok: true,
            uid: user._id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: "Please contact administrator"

        })
    }
}

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ ok: false, message: "User not found" })

        const passwordMatch = bcrypt.compareSync(password, user.password)
        if (!passwordMatch) return res.status(400).json({ ok: false, message: "Invalid password" })

        const token = await createToken(user._id, user.name)

        res.status(201).json({
            ok: true,
            uid: user._id,
            name: user.name, 
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Please contact administrator"
        })
    }
}

const refreshToken = async (req, res = response) => {
    const {uid, name} = req; 
    const token = await createToken(uid, name);

    res.json({
        ok: true,
        token
    })

}



module.exports = { register, login, refreshToken }

