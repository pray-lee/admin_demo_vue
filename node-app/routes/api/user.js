const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const secret = require('../../config/keys').secretOrPrivateKey
const passport = require('passport')

router.get('/test', (req, res) => {
    res.json({msg: 'hello users'})
})

// register
router.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                res.status(400).send({msg: '该邮箱已被注册'})
            } else {
                const newUser = new User({
                    name: req.body.name,
                    password: req.body.password,
                    email: req.body.email
                })

                // password hash
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash
                        // save new user
                        newUser.save()
                            .then(user => res.send(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})

//login
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({email})
        .then(user => {
            if (!user) {
               res.status(404).json({msg: '用户不存在'})
            } else {
                // check password
                bcrypt.compare(password, user.password)
                    .then(isMatched => {
                        if (isMatched) {
                            // set token
                            const rule = {name: user.name, email: user.email}
                            jwt.sign(rule, secret, {expiresIn: 3600}, (err, token) => {
                                res.json({
                                    msg: '登录成功',
                                    token: `Bearer ${token}`
                                })
                            })
                        } else {
                            res.status(404).json({msg: '密码错误'})
                        }
                    })
            }
        })
})

// getInfo
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        name: req.user.name,
        id: req.user.id,
        email:req.user.email
    })
})

module.exports = router