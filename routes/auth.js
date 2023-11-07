import { Router } from 'express'
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import { generateJWTToken } from '../services/token.js'

const router = Router()


router.get('/login', (req, res) => {
    res.render('login', {
        title: "Login",
        loginError: req.flash("loginError")
    })
})


router.get('/register', (req, res) => {
    res.render('register', {
        title: "Shaxsni Tasdiqlash",
        registerError: req.flash("loginError")
    })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        req.flash("loginError", "Hamma maydonchalarni to`ldiring")
        res.redirect('/login')
        return
    }

    const existUser = await User.findOne({ email })
    if (!existUser) {
        req.flash("loginError", "Foydalanuvchi topilmadi...")
        res.redirect('/login')
        return
    }

    const isPassEqual = await bcrypt.compare(password, existUser.password)
    if (!isPassEqual) {
        req.flash("loginError", "Notugri password...")
        res.redirect('/login')
        return
    }

    const token = generateJWTToken(existUser._id)
    res.cookie("JWT token", token, { httpOnly: true, secure: true })
    res.redirect('/')
})

router.post('/register', async (req, res) => {

    const { firstname, lastname, email, password } = req.body

    if (!firstname, !lastname, !email || !password) {
        req.flash("loginError", "Hamma maydonchalarni to`ldiring")
        res.redirect('/register')
        return
    }



    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const userData = {
        firstName: req.body.ism,
        lastName: req.body.familiya,
        email: req.body.email,
        password: hashedPassword,
    }
    const user = await User.create(userData)
    const token = generateJWTToken(user._id)
    res.cookie("JWT token", token, { httpOnly: true, secure: true })
    res.redirect('/')
})


export default router