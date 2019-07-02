const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const secret = require('../../config/keys').secretOrPrivateKey
const passport = require('passport')

// register
router.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                res.status(200).json({
                    errno: -1,
                    message: '该用户已被注册'
                })
            } else {
                const newUser = new User({
                    name: req.body.name,
                    password: req.body.password,
                    email: req.body.email,
                    identity: req.body.identity
                })

                // password hash
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash
                        // save new user
                        newUser.save()
                            .then(user => res.json(user))
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
               res.status(404).json('用户不存在')
            } else {
                // check password
                bcrypt.compare(password, user.password)
                    .then(isMatched => {
                        if (isMatched) {
                            // 当验证成功时，需要返回给req.uesr的数据
                            const rule = {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                identity: user.identity
                            }
                            jwt.sign(rule, secret, {expiresIn: 3600}, (err, token) => {
                                res.json({
                                    msg: '登录成功',
                                    token: `Bearer ${token}`
                                })
                            })
                        } else {
                            res.status(200).json('密码错误')
                        }
                    })
            }
        })
        .catch(err => console.log(err))
})

// getInfo
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        name: req.user.name,
        id: req.user.id,
        email:req.user.email,
        idendity: req.user.identity
    })
})

module.exports = router